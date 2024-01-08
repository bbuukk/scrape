import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());
export async function getCategory(page) {
  let category = "";
  const breadcrumbsItems = await page.$$(
    "ul.breadcrumbs.ng-star-inserted li.breadcrumbs__item.ng-star-inserted"
  );
  for (const item of breadcrumbsItems) {
    const crumbHandle = await item.$("a.breadcrumbs__link span");
    const crumbText = await page.evaluate((el) => el.textContent, crumbHandle);
    category += `${crumbText},`;
  }
  return category;
}

export async function getTitle(page) {
  const heading = await page.$(
    "h1.product__title-left.product__title-collapsed.ng-star-inserted"
  );
  return await page.evaluate((el) => el.textContent, heading);
}

export async function getPrice(page) {
  const priceHandler = await page.$("p.product-price__big");
  const priceString = await page.evaluate((el) => el.textContent, priceHandler);
  return Number.parseInt(priceString.slice(0, -1));
}

export async function getDescription(page) {
  const descr_text = await page.$(
    "div.product-about__description-content.text"
  );
  return await page.evaluate((el) => el.textContent, descr_text);
}
