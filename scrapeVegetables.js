import { writeFile } from "fs/promises";
import fs from "fs";
import { mkdir } from "fs/promises";

import puppeteer from "puppeteer";
import * as path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function scrapeProductPages(url) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  // Get all the product elements
  const vegatableAnchors = await page.$$("#content .row .dircategory a");
  const vegetableUrls = [];
  for (let a of vegatableAnchors) {
    const url = await page.evaluate((el) => el.href, a);
    vegetableUrls.push(url);
  }

  const globalProductUrls = [];
  for (let u of vegetableUrls) {
    await page.goto(u, {
      waitUntil: "domcontentloaded",
    });
    const productAnchors = await page.$$(
      ".product_grid .row .col-xs-6 .product .block .product-img a"
    );

    const productUrls = [];
    for (let a of productAnchors) {
      const url = await page.evaluate((el) => el.href, a);
      productUrls.push(url);
    }
    globalProductUrls.push(productUrls);
  }

  let productsData = [];

  page.setCacheEnabled(false);
  for (let productsUrls of globalProductUrls) {
    for (let url of productsUrls) {
      await page.goto(url, {
        waitUntil: "domcontentloaded",
      });

      const productData = {};
      productData.title = await getTitle(page, ".descr_title");
      productData.amountInPacking = await getAmountInPacking(
        page,
        ".list-unstyled1 li:nth-of-type(3) span.left-atr"
      );
      productData.description = await getDescription(page, ".descr p");

      // const imagePath = await getImage(page);
      const imagePath = await getImageWaitResponse(page);
      productData.imagePath = `/products/${imagePath}`;

      productsData.push(productData);
    }
  }
  console.log(productsData);
  await browser.close();
  return productsData;
}

async function getImage(page) {
  const imgElement = await page.$("#content .row img");
  const imgUrl = await page.evaluate((img) => img.src, imgElement);

  // Split the page URL into parts
  const pageUrlParts = page.url().split("/");
  const folderName = pageUrlParts[pageUrlParts.length - 2];
  let fileName = pageUrlParts[pageUrlParts.length - 1];

  // Extract the file extension from the image URL
  const extension = imgUrl.split(".").pop();

  // Append the extension to the fileName
  fileName = `${fileName}.${extension}`;

  page.on("response", async (response) => {
    if (response.url() === imgUrl) {
      const buffer = await response.buffer();

      // Resolve the file path
      const filePath = path.resolve(__dirname, folderName, fileName);

      if (!fs.existsSync(path.dirname(filePath))) {
        await mkdir(path.dirname(filePath), { recursive: true });
      }
      // Write the image data to a file
      fs.writeFileSync(filePath, buffer, "binary");
    }
  });

  return `${folderName}/${fileName}`;
}

async function getImageWaitResponse(page) {
  // Split the page URL into parts
  const pageUrlParts = page.url().split("/");
  const folderName = pageUrlParts[pageUrlParts.length - 2];
  let fileName = pageUrlParts[pageUrlParts.length - 1];

  try {
    const imgElement = await page.$("#content .row img");
    const imgUrl = await page.evaluate((img) => img.src, imgElement);
    // Extract the file extension from the image URL
    const extension = imgUrl.split(".").pop();

    // Append the extension to the fileName
    fileName = `${fileName}.${extension}`;

    // Wait for the response of the image

    const response = await page.waitForResponse(
      (response) =>
        response.url() === imgUrl &&
        response.request().resourceType() === "image",
      { timeout: 5000 }
    );

    const buffer = await response.buffer();

    // Resolve the file path
    const filePath = path.resolve(__dirname, folderName, fileName);

    if (!fs.existsSync(path.dirname(filePath))) {
      await mkdir(path.dirname(filePath), { recursive: true });
    }
    // Write the image data to a file
    fs.writeFileSync(filePath, buffer, "binary");
  } catch (e) {
    console.log(e.message);
  }

  return `${folderName}/${fileName}`;
}

async function getTitle(page, className) {
  let title = null;
  try {
    title = await page.$eval(className, (element) => element.textContent);
  } catch (error) {
    console.log(error.message);
  }
  return title;
}

async function getAmountInPacking(page, className) {
  let amountInPacking = null;
  try {
    amountInPacking = await page.$eval(className, (element) =>
      element.nextSibling.textContent.trim()
    );
  } catch (error) {
    console.log(error.message);
  }
  return amountInPacking;
}

async function getDescription(page, className) {
  let description = null;
  try {
    description = await page.$eval(className, (element) => element.textContent);
  } catch (error) {
    console.log(error.message);
  }
  return description;
}

async function writeToFile(data, path) {
  try {
    await writeFile(path, JSON.stringify(data, null, 2));
    console.log("Data written to file");
  } catch (error) {
    console.error(`Error writing data to file: ${error}`);
  }
}

const productsData = await scrapeProductPages(
  "https://yaskrava.com.ua/ua/semena/semena-ovoschey-evropaket/"
);
writeToFile(productsData, "globalProductsData.json");
