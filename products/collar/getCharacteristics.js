import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

export async function getCharacteristics(page) {
  const characteristics = {};
  const characteristicsItems = await page.$$(
    "dl.characteristics-full__list div.characteristics-full__item.ng-star-inserted"
  );
  for (const item of characteristicsItems) {
    const labelHandle = await item.$("dt.characteristics-full__label span");
    const lableText = await page.evaluate((el) => el.textContent, labelHandle);
    const valueHandle = await item.$(
      "dd.characteristics-full__value ul.characteristics-full__sub-list li.ng-star-inserted"
    );
    const valueContent = await page.evaluate(
      (el) => el.textContent,
      valueHandle
    );
    characteristics[lableText] = valueContent;
  }
  return characteristics;
}
