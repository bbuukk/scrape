import { writeFile } from "fs/promises";
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
  const anchors = await page.$$(
    ".product_grid .row .col-xs-6 .product .block .product-img a"
  );

  // Collect all the URLs from the anchors
  const urls = [];
  for (let a of anchors) {
    const url = await page.evaluate((el) => el.href, a);
    urls.push(url);
  }

  let productsData = [];

  // Visit each URL
  for (let url of urls) {
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
  console.log(productsData);
  await browser.close();
  return productsData;
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
  "https://yaskrava.com.ua/ua/semena/semena-ovoschey-evropaket/tomat-evropaket/"
);
console.log(productsData);
writeToFile(productsData, "productsData.json");
