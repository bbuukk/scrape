import { writeFile } from "fs/promises";
import fs from "fs";
import puppeteer from "puppeteer";

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
  console.log(vegetableUrls);

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
  //   print2DArray(globalProductUrls);
  //   write2DArrayToFile(globalProductUrls, "test.json");
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

      productsData.push(productData);
      // await new Promise((r) => setTimeout(r, 1000));
    }
  }
  console.log(productsData);
  await browser.close();
  return productsData;
}

function write2DArrayToFile(array, filename) {
  const jsonString = JSON.stringify(array, null, 2);
  fs.writeFile(filename, jsonString, (err) => {
    if (err) {
      console.error("Error writing file", err);
    } else {
      console.log(`Successfully wrote 2D array to ${filename}`);
    }
  });
}

function print2DArray(array) {
  for (let i = 0; i < array.length; i++) {
    let row = "";
    for (let j = 0; j < array[i].length; j++) {
      row += array[i][j] + " ";
    }
    console.log(row);
  }
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
