import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import { START_URL } from "./scrapSearch.js";

export async function searchFor(page, entry) {
  let product = { name: entry, url: null };
  try {
    await new Promise((r) => setTimeout(r, 100)); //time delay to mimic human slowness
    await page.goto(START_URL + "/search?text=" + encodeURIComponent(entry));

    const notFoundSelector = "div.search-nothing__buttons-wrapper";
    const foundSelector = "a.goods-tile__heading.ng-star-inserted";

    //is landed on individual product page or search page
    const currentUrl = page.url();
    if (currentUrl.includes("search")) {
      const selector = await Promise.race([
        page.waitForSelector(notFoundSelector).then(() => notFoundSelector),
        page.waitForSelector(foundSelector).then(() => foundSelector),
      ]);

      if (selector == foundSelector) {
        product = { name: entry, url: await getLandingProductUrl(page) };
      }
    } else {
      product = { name: entry, url: currentUrl };
    }
    console.log(product);
  } catch (e) {
    console.log(e.message);
  }

  await page.goto(START_URL);
  return product;
}

async function getLandingProductUrl(page) {
  const anchor = await page.$("a.goods-tile__heading.ng-star-inserted");
  const productLandingUrl = await page.evaluate((el) => el.href, anchor);
  return productLandingUrl;
}
