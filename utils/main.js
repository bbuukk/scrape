import { init } from "./globals/init.js";
import { getProductLandingUrls } from "./search/search.js";
import { writeToFile } from "./io/writeToFile.js";
import { readJson, readTxtLinesToArray } from "./io/readFile.js";
import { scrapeSearch } from "./scrape/scrape.js";
import * as fs from "fs";

export async function scrape(brand) {
  const { browser, page } = await init("https://rozetka.com.ua/ua/");

  let productsInfo = null;
  try {
    fs.accessSync(`info/${brand}.json`, fs.constants.F_OK);
    productsInfo = await readJson(`info/${brand}.json`);
  } catch (err) {
    console.log("productsInfo not Found");
    const entries = await readTxtLinesToArray(`entries/${brand}.txt`);

    const info = await getProductLandingUrls(page, entries);
    console.log(info);

    const { foundEntries, notFoundEntries } = info;
    productsInfo = info.productsInfo;

    await writeToFile(
      foundEntries + "\n\n" + notFoundEntries,
      `notFound/${brand}.txt`
    );
    await writeToFile(
      JSON.stringify(productsInfo, null, 2),
      `info/${brand}.json`
    );
  }

  // const productsData = await scrapeSearch(page, productsInfo, brand);
  // await writeToFile(
  //   JSON.stringify(productsData, null, 2),
  //   `data/${brand}.json`
  // );

  await browser.close();
  // return productsData;
}

// aleana
// olkar
// partner(aleana)
// garden-club
// prof_nasinna
// greenharvest
// recordagro-b
// household_malceva
// spektr-agro
// kiloma_service
// ukravit
// kisson
// vinxozgroup
// level_xoztovaru

// bazar-luyba
// animall
// royal-canin
// collar
// pan-kitpan-pes
// wiskas
// josera
// product
// krug_semenko
// pruroda
// myav-4paws-openmeal
// purina-friskies

const toScrape = [
  "aleana",
  "garden-club",
  "greenharvest",
  "household_malceva",
  "kiloma_service",
  "kisson",
  "level_xoztovaru",
  "olkar",
  "partner(aleana)",
  "prof_nasinna",
  "recordagro-b",
  "spektr-agro",
  "ukravit",
  "vinxozgroup",
];

for (const brand of toScrape) {
  await scrape(brand);
}
