import { writeToFile } from "../utils/writeToFile.js";
import { getTitle, getDescription } from "../utils/scrape.js";
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

  const globProductUrls = [];
  const pages = 40; //40
  for (let i = 1; i <= pages; i++) {
    await page.goto(`${url}${i}`, {
      waitUntil: "domcontentloaded",
    });
    const productUrls = await page.$$(
      "div.row_catalog_products div.product a.p_img_href"
    );
    for (let aTag of productUrls) {
      const url = await page.evaluate((el) => el.href, aTag);
      globProductUrls.push(url);
    }
  }

  await page.setCacheEnabled(false);

  const productsData = [];
  for (let url of globProductUrls) {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    const productData = {};
    productData.title = await getTitle(
      page,
      ".description_card_product h1.product_card_name"
    );

    productData.description = await getDescription(page, "#tab-description");

    const imagePath = await getImageWaitResponse(page);
    productData.imagePath = `/products/${imagePath}`;

    console.log(productData);
    productsData.push(productData);
  }

  // console.log(productsData);
  // await browser.close();
  return productsData;
}

async function getImageWaitResponse(page) {
  // Split the page URL into parts
  const pageUrlParts = page.url().split("/");
  const productSlug = pageUrlParts[pageUrlParts.length - 2];
  const folderName = productSlug.split("-")[0];
  let fileName = productSlug;

  try {
    const imgAnchor = await page.$(".slider_product_card .single_image a");
    const urlOfImage = await page.evaluate((el) => el.href, imgAnchor);

    const urlOfImageSplit = urlOfImage.split(".");
    const extension = urlOfImageSplit[urlOfImageSplit.length - 1];
    fileName = `${fileName}.${extension}`;

    let res = null;
    page.on("response", async (response) => {
      if (response.url() === urlOfImage) {
        res = response;
      }
    });

    await page.goto(urlOfImage, {
      waitUntil: "domcontentloaded",
    });

    const buffer = await res.buffer();

    const filePath = path.resolve(__dirname, folderName, fileName);

    if (!fs.existsSync(path.dirname(filePath))) {
      await mkdir(path.dirname(filePath), { recursive: true });
    }
    fs.writeFileSync(filePath, buffer, "binary");
  } catch (e) {
    console.log(e.message);
  }

  return `${folderName}/${fileName}`;
}

const productsData = await scrapeProductPages(
  "https://ukrseeds.net.ua/nasinnja-ovochiv/c-379.html?page="
);
writeToFile(productsData, "globalProductsData.json");
