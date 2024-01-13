import { init } from "./globals/init.js";
import { getProductLandingUrls } from "./search/search.js";
import { writeToFile } from "./io/writeToFile.js";
import { readJson, readTxtLinesToArray } from "./io/readFile.js";
import { scrapeSearch } from "./scrape/scrape.js";

export async function scrape(brand) {
  const { browser, page } = await init("https://rozetka.com.ua/ua/");

  const entries = await readTxtLinesToArray("entries.txt");
  const { notFoundEntries, productsInfo } = await getProductLandingUrls(
    page,
    entries
  );

  await writeToFile(notFoundEntries, "notFound.txt");
  const productsData = await scrapeSearch(page, productsInfo, brand);
  writeToFile(JSON.stringify(productsData, null, 2), "data.json");

  await browser.close();
  return productsData;
}

scrape("Collar");
