import { writeFile } from "fs/promises";
import fs from "fs";
import { mkdir } from "fs/promises";

import puppeteer from "puppeteer";
import * as path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function scrape(url) {
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
  const potCategoryAnchors = await page.$$(
    "div#content div:nth-of-type(2) div.image a"
  );
  let potCategoryUrls = [];
  for (let a of potCategoryAnchors) {
    const url = await page.evaluate((el) => el.href, a);
    potCategoryUrls.push(url);
  }
  potCategoryUrls.pop();
  potCategoryUrls.pop();
  // console.log(potCategoryUrls);

  const potUrls = [];
  for (const u of potCategoryUrls) {
    await page.goto(u, {
      waitUntil: "domcontentloaded",
    });
    const potAnchors = await page.$$("div.image a:last-child");
    for (let a of potAnchors) {
      const url = await page.evaluate((el) => el.href, a);
      potUrls.push(url);
    }
  }

  // const potUrls = [
  //   "https://shop.aleana.ua/katalog/vazoni-i-kashpo-dlya-roslin/kashpo-i-vazoni/vazon-smile/vazon-smile-d10sm-bilijtrozh",
  //   "https://shop.aleana.ua/katalog/vazoni-i-kashpo-dlya-roslin/kashpo-i-vazoni/vazon-fyuzhn/vazon-fyuzhn-d1630sm-bila-roza",
  // ];

  let productsData = [];
  page.setCacheEnabled(false);
  for (let url of potUrls) {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    const productData = {};
    productData.title = await getTitle(page, "h1.product-title");
    productData.description = await getDescription(
      page,
      "#content div.product-middle .tab-content #tab-description .tab-description_left p"
    );

    const imagePath = await getImageWaitResponse(page);
    productData.imagePath = `aleana/${imagePath}`;

    productsData.push(productData);
    console.log(productData);
  }
  // console.log(productsData);
  await browser.close();
  return productsData;
}
const productsData = scrape(
  "https://shop.aleana.ua/katalog/vazoni-i-kashpo-dlya-roslin/kashpo-i-vazoni/"
);

// writeToFile(productsData, "scrape.json");

async function getImageWaitResponse(page) {
  // Split the page URL into parts
  const pageUrlParts = page.url().split("/");
  let folderName = pageUrlParts[pageUrlParts.length - 2];
  folderName = `images/${folderName}`;
  let fileName = pageUrlParts[pageUrlParts.length - 1];

  try {
    const imgElement = await page.$("li.big_image img");
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

async function getDescription(page, className) {
  let description = null;
  try {
    description = await page.$eval(className, (element) => element.textContent);
  } catch (error) {
    console.log(error.message);
  }
  return description;
}
