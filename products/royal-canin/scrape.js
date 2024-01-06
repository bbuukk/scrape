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

  const 

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

const productsData = await scrapeProductPages(
  "https://yaskrava.com.ua/ua/semena/semena-ovoschey-evropaket/"
);
writeToFile(productsData, "globalProductsData.json");
