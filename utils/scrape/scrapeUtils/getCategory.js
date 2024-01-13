import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
// import { readJson } from "../../readFile.js";
puppeteer.use(StealthPlugin());

// const CATEGORIES = readJson("categories.json");

export async function getCategory(page) {
  let category = "";

  try {
    const breadcrumbsItems = await page.$$(
      "ul.breadcrumbs.ng-star-inserted li.breadcrumbs__item.ng-star-inserted"
    );
    for (let index = 0; index < breadcrumbsItems.length; index++) {
      const item = breadcrumbsItems[index];
      const crumbHandle = await item.$("a.breadcrumbs__link span");
      const crumbText = await page.evaluate(
        (el) => el.textContent,
        crumbHandle
      );
      category += `${crumbText},`;
    }
  } catch (e) {
    console.log(`category is not found\n`);
  }

  return category;
}
