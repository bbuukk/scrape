import { writeToFile } from "../../utils/writeToFile.js";
import puppeteer from "puppeteer-extra";

import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

import randomUseragent from "random-useragent";

async function scrapeSearch(searchEntries) {
  const startUrl = "https://rozetka.com.ua/ua/";
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();
  await page.setUserAgent(randomUseragent.getRandom());
  await page.goto(startUrl, {
    waitUntil: "domcontentloaded",
  });

  const productsUrls = [];
  const searchEntriesArray = searchEntries.split("\n");
  for (let searchEntry of searchEntriesArray) {
    const searchForm = await page.$("form.search-form");

    const inputField = await searchForm.$("input[name='search']");
    await new Promise((r) => setTimeout(r, 1000)); //time delay to mimic human slowness
    await inputField.type(searchEntry);

    const submitButton = await searchForm.$("button.button");
    await Promise.all([
      submitButton.click(),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    try {
      const anchor = await page.$("a.goods-tile__heading.ng-star-inserted");
      const productLandingUrl = await page.evaluate((el) => el.href, anchor);
      productsUrls.push(productLandingUrl);
    } catch (e) {
      productsUrls.push("https://rozetka.com.ua/ua/");
    }

    await page.goto(startUrl, {
      waitUntil: "domcontentloaded",
    });
  }

  for (const u of productsUrls) {
    await page.goto(u, {
      waitUntil: "domcontentloaded",
    });
    await await new Promise((r) => setTimeout(r, 1000));
  }

  let productsData = [];
  return productsData;
}

async function searchFor(entry) {}

const searchEntries = `Модульний будиночок для котів Телепет
Адресник для котів і собак металевий кісточка Waudog Smart ID з QR паспортом Абстракція
Адресник для котів і собак металевий круг Waudog Smart ID 3 QR паспортом Абстракція
Тренувальний снаряд для собак Puller діаметр 12.5см
Тренувальний снаряд для собак Puller діаметр 18см
Тренувальний снаряд для собак Puller діаметр 19.5см
Тренувальний снаряд для собак Puller діаметр 28см
СУПЕРІУМ Спіносад таблетки для котів і собак від 1.3 до 2.5кг
СУПЕРІУМ Спіносад таблетки для котів і собак від 2.5 до 5кг
СУПЕРІУМ Спіносад таблетки для котів і собак від 5 до 10кг
СУПЕРІУМ Спіносад таблетки для котів і собак від 10 до 20 кг
СУПЕРІУМ Панацея протипаразитарні таблетки для котів 0.5-2кг
СУПЕРІУМ Панацея протипаразитарні таблетки для котів 2-8кг
СУПЕРІУМ Панацея протипаразитарні таблетки для котів 8-16кг
Нашийник CoLLar одинарний коричневий 00036
Нашийник CoLLar одинарний з прикрасами чорний 00041
Нашийник CoLLar одинарний чорний 00151
Шлея з бавовняної стрічки CoLLar для середніх собак 0637
Шлея з бавовняної стрічки CoLLar для великих собак 0645
Шлея з бавовняної стрічки CoLLar для малих та середніх собак 0635
Нашийник з бавовняної стрічки CoLLar безрозмірний 6754
Нашийник з бавовняної стрічки CoLLar безрозмірний 6755
Нашийник з бавовняної стрічки CoLLar подвійний 6137
Нашийник з бавовняної стрічки CoLLar 0144
Нашийник для собак нейлоновий WAUDOG Nylon з QR-паспортом Мілітарі 281-4026
Нашийник для собак нейлоновий WAUDOG Nylon з QR-паспортом Мілітарі 280-4026
Нашийник для котів та дрібних порід собак нейлоновий WAUDOG Nylon 3 QR-паспортом Мілітарі 279-40
Повідець для собак з нейлону регульований WAUDOG Nylon Мілітарі 370-4026
Нашийник шкіряний WAUDOG Glamour 3 QR паспортом з стразами квіти Ш 9 Д 21-29см ментоловий 32
Нашийник шкіряний WAUDOG Glamour 3 QR паспортом з стразами квіти 9 Д 19-25см помаранчевий
Нашийник шкіряний WAUDOG Glamour 3 QR паспортом з стразами квіти Ш 9 Д 18-21см блакитний 325
Нашийник шкіряний WAUDOG Glamour 3 QR паспортом з стразами квіти Ш 9 Д 18-21 рожевий
Нашийник шкіряний WAUDOG Glamour 3 QR паспортом з стразами квіти Ш 9 Д 18-21 см салатовий
Нашийник з бавовняної стрічки Collar подвійний 6138
Повідець з бавовняної стрічки Collar 0498
Нашийник з бавовняної стрічки Collar безрозмірний 6756
Нашийник з бавовняної стрічки Collar подвійний 6136
Нашийник з бавовняної стрічки Collar 0240
Повідець з бавовняної стрічки Collar 0496`;

const testEntries = `Модульний будиночок для котів Телепет
Адресник для котів і собак металевий кісточка Waudog Smart ID з QR паспортом Абстракція
Адресник для котів і собак металевий круг Waudog Smart ID 3 QR паспортом Абстракція
Тренувальний снаряд для собак Puller діаметр 12.5см
Тренувальний снаряд для собак Puller діаметр 18см
Тренувальний снаряд для собак Puller діаметр 19.5см`;

const productsData = await scrapeSearch(testEntries);
console.log(productsData);
//   writeToFile(productsData, "scrape.json");
