import { getImages } from "./getImage.js";
import { writeToFile } from "../../utils/writeToFile.js";
import { red, flash, terminator } from "../../utils/variables.js";

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

import randomUseragent from "random-useragent";

import { getCharacteristics } from "./getCharacteristics.js";
import { getCategory, getDescription, getPrice, getTitle } from "./getUtils.js";
import { searchFor } from "./searchFor.js";

export const START_URL = "https://rozetka.com.ua/ua/";

async function init(startUrl) {
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

  page.setCacheEnabled(false);

  return { browser, page };
}

async function getProductLandingUrls(page, searchEntries) {
  let products = [];
  const notFoundEntries = [];
  const searchEntriesArray = searchEntries.split("\n");

  for (const entry of searchEntriesArray) {
    const product = await searchFor(page, entry);
    if (product.url == null) {
      notFoundEntries.push(entry);
    } else {
      products.push(product);
    }
  }
  return { notFoundEntries, products };
}

async function scrapeSearch(searchEntries) {
  const { browser, page } = await init(START_URL);
  const { notFoundEntries, productsLandingUrls } = await getProductLandingUrls(
    page,
    searchEntries
  );
  writeToFile(notFoundEntries, "notFound.txt");

  const products = [];
  // for (const productInfo of productsLandingUrls) {
  //   const product = { name: productInfo.name };

  //   if (productInfo.url != null) {
  //     await page.setUserAgent(randomUseragent.getRandom());
  //     await page.goto(productInfo.url, {
  //       waitUntil: "domcontentloaded",
  //     });

  //     product.category = await getCategory();
  //     product.title = await getTitle();
  //     product.price = await getPrice();
  //     product.description = await getDescription();
  //     product.characteristics = await getCharacteristics(page);
  //   } else {
  //     console.log(`${red}${productInfo.name} NOT FOUND\n${flash}${terminator}`);
  //   }

  //   console.log(product, `\n${terminator}`);
  //   products.push(product);
  // }

  await browser.close();
  return products;
}

const searchEntries = `Модульний будиночок для котів Телепет
СУПЕРІУМ Панацея протипаразитарні таблетки для котів 0.5-2кг для котів і собак
СУПЕРІУМ Панацея протипаразитарні таблетки для котів 2-8кг для котів і собак
СУПЕРІУМ Панацея протипаразитарні таблетки для котів 8-16кг для котів і собак
Спиносад СУПЕРИУМ таблетка від 1.3 до 2.5кг для котів і собак
Спиносад СУПЕРИУМ таблетка від 2.5 до 5кг для котів і собак
Спиносад СУПЕРИУМ таблетка для котів і собак від 5 до 10кг для котів і собак
Спиносад СУПЕРИУМ таблетка для котів і собак від 10 до 20 кг для котів і собак
Адресник для котів і собак металевий круг Waudog Smart ID Абстракція
Тренувальний снаряд для собак Puller діаметр 12.5см
Тренувальний снаряд для собак Puller діаметр 18см
Тренувальний снаряд для собак Puller діаметр 19.5см
Тренувальний снаряд для собак Puller діаметр 28см
Нашийник CoLLar одинарний коричневий 
Нашийник CoLLar одинарний з прикрасами чорний 
Нашийник CoLLar одинарний чорний 
Шлея з бавовняної стрічки CoLLar для середніх собак 
Шлея з бавовняної стрічки CoLLar для великих собак 
Шлея з бавовняної стрічки CoLLar для малих та середніх собак 
Нашийник для собак нейлоновий WAUDOG Nylon Мілітарі 
Нашийник для собак нейлоновий WAUDOG Nylon Мілітарі 
Нашийник для котів та дрібних порід собак нейлоновий WAUDOG Nylon Мілітарі
Повідець для собак з нейлону регульований WAUDOG Nylon Мілітарі
Нашийник шкіряний WAUDOG Glamour 21-29см ментоловий 
Нашийник шкіряний WAUDOG Glamour 9 Д 19-25см помаранчевий
Нашийник шкіряний WAUDOG Glamour Ш 9 Д 18-21см блакитний 325
Нашийник шкіряний WAUDOG Glamour Ш 9 Д 18-21 рожевий
Нашийник шкіряний WAUDOG Glamour Ш 9 Д 18-21 см салатовий
Нашийник з бавовняної стрічки Collar безрозмірний
Нашийник з бавовняної стрічки Collar подвійний
Нашийник з бавовняної стрічки Collar
Повідець з бавовняної стрічки Collar
Повідець з відновленої бавовни WAUDOG світовідбиваючий салатовий 
Повідець з відновленої бавовни WAUDOG світовідбиваючий блакитний 
М'ячик світлонакопичувальний WAUDOG Fun з отвором для смаколиків 7см 
Нашийник з відновленої бавовни WAUDOG пластикова пряжка салатовий 
Нашийник з відновленої бавовни WAUDOG пластикова пряжка блакитний 
Нашийник нейлоновий WAUDOG Nylon світлонак. фіолетовий 
Нашийник нейлоновий WAUDOG Nylon світлонак, блакитний 
Нашийник шкіряний WAUDOG Classic салатовий 
Повідець нейлоновий WAUDOG Nylon регульований Етно зелений 
Повідець нейлоновий WAUDOG Nylon регульований Темний рицар 
Повідець нейлоновий WAUDOG Nylon регульований Чудо жінка 
Повідець нейлоновий WAUDOG Nylon регульований Рік та Морті 
Повідець нейлоновий WAUDOG Nylon регульований Супермен 
Повідець-шнур нейлоновий WAUDOG Nylon амортизуючий 
Повідець-шнур нейлоновий WAUDOG Nylon амортизуючий 
Нашийник нейлоновий WAUDOG Nylon Рік та Морті 
Нашийник нейлоновий WAUDOG Nylon Темний рицар 
Нашийник нейлоновий WAUDOG Nylon Чудо жінка 
Нашийник нейлоновий WAUDOG Nylon Супермен 
Шлея для собак анатомічна WAUDOG Nylon Супермен 
Шлея для собак анатомічна WAUDOG Nylon Чудо-жінка 
Шлея для собак анатомічна Н-образна WAUDOG Nylon Рік та морті
Шлея Collar з повідцем для малих собак коричневий 
Шлея Collar з повідцем для малих собак чорний 
Нашийник шкіряний WAUDOG Glamour блакитний 
Нашийник шкіряний WAUDOG Glamour чорний 
Шлея для собак безпечна WAUDOG Nylon фіолетова 
Шлея для собак анатомічна WAUDOG Nylon Етно синій 
Шлея для собак анатомічна WAUDOG Nylon Авокадо 
Адресник для котів і собак персоналізований металевий Waudog Smart ID`;

const testEntries = `Модульний будиночок для котів Телепет
NONSENSE NOT FOUND FOR DOGS 1
Спиносад СУПЕРИУМ таблетка від 1.3 до 2.5кг для котів і собак
NONSENSE NOT FOUND FOR DOGS 2
Спиносад СУПЕРИУМ таблетка для котів і собак від 5 до 10кг для котів і собак
NONSENSE NOT FOUND FOR DOGS 3`;
const productsData = await scrapeSearch(testEntries);

// const productsData = await scrapeSearch(searchEntries);
// writeToFile(productsData, "search.json");

const allPositions = `Модульний будиночок для котів Телепет
Адресник для котів і собак металевий круг Waudog Smart ID Абстракція
Тренувальний снаряд для собак Puller діаметр 12.5см
Тренувальний снаряд для собак Puller діаметр 18см
Тренувальний снаряд для собак Puller діаметр 19.5см
Тренувальний снаряд для собак Puller діаметр 28см
Спиносад СУПЕРИУМ таблетка для котів і собак від 1.3 до 2.5кг
Спиносад СУПЕРИУМ таблетка для котів і собак від 2.5 до 5кг
Спиносад СУПЕРИУМ таблетка для котів і собак від 5 до 10кг
Спиносад СУПЕРИУМ таблетка для котів і собак від 10 до 20 кг
СУПЕРІУМ Панацея протипаразитарні таблетки для котів 0.5-2кг
СУПЕРІУМ Панацея протипаразитарні таблетки для котів 2-8кг
СУПЕРІУМ Панацея протипаразитарні таблетки для котів 8-16кг
Нашийник CoLLar одинарний коричневий 
Нашийник CoLLar одинарний з прикрасами чорний 
Нашийник CoLLar одинарний чорний 
Шлея з бавовняної стрічки CoLLar для середніх собак 
Шлея з бавовняної стрічки CoLLar для великих собак 
Шлея з бавовняної стрічки CoLLar для малих та середніх собак 
Нашийник для собак нейлоновий WAUDOG Nylon Мілітарі 
Нашийник для собак нейлоновий WAUDOG Nylon Мілітарі 
Нашийник для котів та дрібних порід собак нейлоновий WAUDOG Nylon Мілітарі
Повідець для собак з нейлону регульований WAUDOG Nylon Мілітарі
Нашийник шкіряний WAUDOG Glamour ментоловий 
Нашийник шкіряний WAUDOG Glamour помаранчевий
Нашийник шкіряний WAUDOG Glamour 18-21см блакитний 
Нашийник шкіряний WAUDOG Glamour Ш 9 Д 18-21 рожевий
Нашийник шкіряний WAUDOG Glamour Ш 9 Д 18-21 см салатовий
Нашийник з бавовняної стрічки Collar безрозмірний
Нашийник з бавовняної стрічки Collar подвійний
Нашийник з бавовняної стрічки Collar
Повідець з бавовняної стрічки Collar
Повідець для котів та дрібних порід собак з відновленої бавовни WAUDOG світловідбиваючий салатовий 
Повідець для котів та дрібних порід собак з відновленої бавовни WAUDOG світловідбиваючий блакитний 
Іграшка для собак WAUDOG Fun М'ячик світлонакопичувальний з отвором для ласощів
Нашийник з відновленої бавовни WAUDOG пластикова пряжка салатовий 
Нашийник з відновленої бавовни WAUDOG пластикова пряжка блакитний 
Нейлоновий нашийник WAUDOG Nylon з QR паспортом, малюнок "Фіолетовий камо", пластиковий фастекс, для собак.
Нашийник для собак нейлоновий WAUDOG Nylon пластиковий фастекс, що світиться/світловідбивний,
Нашийник шкіряний WAUDOG Classic салатовий 
Повідець нейлоновий WAUDOG Nylon регульований Етно зелений 
Повідець для собак нейлоновий Collar WAUDOG Nylon, малюнок "Темний лицар"
Повідець для собак нейлоновий Collar WAUDOG Nylon, малюнок "Чудо жінка"
Повідець для собак нейлоновий Collar WAUDOG Nylon, малюнок "Рік та Морті"
Повідець для собак нейлоновий Collar WAUDOG Nylon, малюнок "Супермен"
Повідець-шнур нейлоновий WAUDOG Nylon амортизуючий 
Повідець-шнур нейлоновий WAUDOG Nylon амортизуючий 
Нашийник нейлоновий WAUDOG Nylon Рік та Морті 
Нашийник нейлоновий WAUDOG Nylon Темний рицар 
Нашийник нейлоновий WAUDOG Nylon Чудо жінка 
Нашийник нейлоновий WAUDOG Nylon Супермен 
Шлея для собак анатомічна WAUDOG Nylon Супермен 
Шлея для собак анатомічна WAUDOG Nylon Чудо-жінка 
Шлея для собак анатомічна Н-образна WAUDOG Nylon Рік та морті
Шлея Collar з повідцем для малих собак коричневий 
Шлея Collar з повідцем для малих собак чорний 
Нашийник шкіряний WAUDOG Glamour блакитний 
Нашийник шкіряний WAUDOG Glamour чорний 
Шлея для собак безпечна WAUDOG Nylon фіолетова 
Шлея для собак анатомічна WAUDOG Nylon Етно синій 
Шлея для собак анатомічна WAUDOG Nylon Авокадо 
Адресник для котів і собак персоналізований металевий Waudog Smart ID`;
