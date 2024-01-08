import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());
import { START_URL } from "./scrapSearch.js";
import { flash, green, red, terminator } from "../../utils/variables.js";

export async function searchFor(page, entry) {
  let product = { name: entry, url: null };
  try {
    await new Promise((r) => setTimeout(r, 100)); //time delay to mimic human slowness
    await page.goto(START_URL + "/search?text=" + encodeURIComponent(entry));

    const currentUrl = page.url();
    //is search landed on individual product page or search page

    // const selector1 = "selector1";
    // const selector2 = "selector2";

    // const element = await Promise.race([
    //   page
    //     .waitForSelector(selector1)
    //     .then(() => ({ selector: selector1, element: page.$(selector1) })),
    //   page
    //     .waitForSelector(selector2)
    //     .then(() => ({ selector: selector2, element: page.$(selector2) })),
    // ]);

    // console.log("Selector used: " + element.selector);

    if (currentUrl.includes("search")) {
      try {
        await page.waitForSelector("div.search-nothing__buttons-wrapper", {
          timeout: 1000,
        });
        console.log(`${red}${entry} NOT FOUND\n${flash}`);
      } catch (e) {
        console.log(`${green}${entry}FOUND\n${flash}`);
        await page.waitForSelector("a.goods-tile__heading.ng-star-inserted");
        product = { name: entry, url: await getLandingProductUrl(page) };
      }
    } else {
      product = { name: entry, url: currentUrl };
    }

    console.log(product);
  } catch (e) {
    console.log(`${red}${entry} NOT FOUND\n${flash}`);
  }

  await page.goto(START_URL);
  return product;
}

async function getLandingProductUrl(page) {
  const anchor = await page.$("a.goods-tile__heading.ng-star-inserted");
  const productLandingUrl = await page.evaluate((el) => el.href, anchor);
  return productLandingUrl;
}
