import { getImages } from "./getImage.js";
import { writeToFile } from "../../utils/writeToFile.js";
import { red, flash, terminator } from "../../utils/variables.js";
import CyrillicToTranslit from "cyrillic-to-translit-js";

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
puppeteer.use(StealthPlugin());

import randomUseragent from "random-useragent";

import fs from "fs";
import { mkdir } from "fs/promises";

import * as path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const startUrl = "https://rozetka.com.ua/ua/";
const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: null,
  userDataDir: "./tmp",
});
const page = await browser.newPage();

async function scrapeSearch(searchEntries) {
  await page.setUserAgent(randomUseragent.getRandom());
  await page.goto(startUrl, {
    waitUntil: "domcontentloaded",
  });

  page.setDefaultNavigationTimeout(120000); // 120 seconds
  const productsLandingUrls = await (async function GetProductLandingUrls() {
    let urls = [];
    const searchEntriesArray = searchEntries.split("\n");
    for (const entry of searchEntriesArray) {
      const url = await searchFor(entry);
      urls.push(url);
    }
    return urls;
  })();

  //   for debug
  // const productsLandingUrls = [
  //   {
  //     name: "Модульний будиночок для котів Телепет",
  //     url: "https://rozetka.com.ua/ua/346044016/p346044016/",
  //   },
  // ];
  // await page.goto("https://rozetka.com.ua/ua/346044016/p346044016/", {
  //   waitUntil: "domcontentloaded",
  // });

  const products = [];

  page.setCacheEnabled(false);
  page.setDefaultNavigationTimeout(120000); // 60 seconds

  for (const productInfo of productsLandingUrls) {
    let product = { name: productInfo.name };
    if (productInfo.url) {
      const imagesUrls = new Set();
      page.on("response", (res) => {
        if (
          res.request().resourceType() === "image" &&
          res.url().includes("/goods/images/big")
        ) {
          imagesUrls.add(res.url());
          console.log(res.url());
        }
      });

      // function saveImage() {}

      await page.goto(productInfo.url, {
        waitUntil: "domcontentloaded",
      });

      product.category = await (async function getCategory() {
        let category = "";
        const breadcrumbsItems = await page.$$(
          "ul.breadcrumbs.ng-star-inserted li.breadcrumbs__item.ng-star-inserted"
        );
        for (const item of breadcrumbsItems) {
          const crumbHandle = await item.$("a.breadcrumbs__link span");
          const crumbText = await page.evaluate(
            (el) => el.textContent,
            crumbHandle
          );
          category += `${crumbText},`;
        }
        return category;
      })();

      product.title = await (async function getTitle() {
        const heading = await page.$(
          "h1.product__title-left.product__title-collapsed.ng-star-inserted"
        );
        return await page.evaluate((el) => el.textContent, heading);
      })();

      product.price = await (async function getPrice() {
        const priceHandler = await page.$("p.product-price__big");
        const priceString = await page.evaluate(
          (el) => el.textContent,
          priceHandler
        );
        return Number.parseInt(priceString.slice(0, -1));
      })();

      product.description = await (async function getDescription() {
        const descr_text = await page.$(
          "div.product-about__description-content.text"
        );
        return await page.evaluate((el) => el.textContent, descr_text);
      })();

      product.characteristics = await (async function getCharacteristics() {
        const characteristics = {};
        const characteristicsItems = await page.$$(
          "dl.characteristics-full__list div.characteristics-full__item.ng-star-inserted"
        );
        for (const item of characteristicsItems) {
          const labelHandle = await item.$(
            "dt.characteristics-full__label span"
          );
          const lableText = await page.evaluate(
            (el) => el.textContent,
            labelHandle
          );
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
      })();

      // networkidle0
      try {
        await page.waitForNavigation({ waitUntil: "networkidle2" });
      } catch (e) {
        console.log(`${red}${e.message}\n${flash}`);
      }
      console.log(imagesUrls);

      product.images = await (async function getImage() {
        const imagesPaths = [];
        const categorySplitted = product.category.split(",");
        let folderName = categorySplitted[categorySplitted.length - 2];

        const cyrillicToTranslit = new CyrillicToTranslit();

        folderName = cyrillicToTranslit
          .transform(folderName)
          .toLowerCase()
          .split(" ")
          .join("_");
        folderName = `images/${folderName}`;

        let fileName = cyrillicToTranslit
          .transform(product.name)
          .toLowerCase()
          .split(" ")
          .join("_");

        try {
          const imagesUrlsArray = Array.from(imagesUrls);
          for (let index = 0; index < imagesUrlsArray.length; index++) {
            const imageUrl = imagesUrlsArray[index];

            console.log(index, "  ->   ", imageUrl);

            const extension = imageUrl.split(".").pop();
            fileName = `${fileName}_${index}.${extension}`;
            imagesPaths.push(`${folderName}/${fileName}`);

            const responsePromise = page.waitForResponse(
              (response) => response.url() === imageUrl,
              { timeout: 5000 }
            );

            await page.goto(imageUrl, {
              waitUntil: "domcontentloaded",
            });

            const response = await responsePromise;

            const buffer = await response.buffer();
            const filePath = path.resolve(__dirname, folderName, fileName);

            if (!fs.existsSync(path.dirname(filePath))) {
              await mkdir(path.dirname(filePath), { recursive: true });
            }
            fs.writeFileSync(filePath, buffer, "binary");
          }
        } catch (e) {
          console.log(`${red}${e.message}\n${flash}`);
        }
        return imagesPaths;
      })();
    } else {
      console.log(`${red}${productInfo.name} NOT FOUND\n${flash}${terminator}`);
    }

    console.log(product, `\n${terminator}`);
    products.push(product);
  }

  await browser.close();
  return products;
}

async function searchFor(entry) {
  const searchForm = await page.$("form.search-form");

  const inputField = await searchForm.$("input[name='search']");
  await new Promise((r) => setTimeout(r, 500)); //time delay to mimic human slowness
  await inputField.type(entry);

  const submitButton = await searchForm.$("button.button");

  await Promise.all([
    submitButton.click(),
    page.waitForNavigation({ waitUntil: ["networkidle2", "domcontentloaded"] }),
    // page.waitForNavigation({ waitUntil: "domcontentloaded" }),
  ]);

  let product = {};
  try {
    product = { name: entry, url: await getLandingProductUrl() };
  } catch (e) {
    // console.log(`${entry} NOT FOUND`);
    product = { name: entry, url: null };
  }

  await page.goto(startUrl, {
    waitUntil: "domcontentloaded",
  });

  return product;
}

async function getLandingProductUrl() {
  const anchor = await page.$("a.goods-tile__heading.ng-star-inserted");
  const productLandingUrl = await page.evaluate((el) => el.href, anchor);
  return productLandingUrl;
}

const searchEntries = `Модульний будиночок для котів Телепет
Адресник для котів і собак металевий круг Waudog Smart ID Абстракція
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
Адресник для котів і собак металевий кісточка Waudog Smart ID з QR паспортом Абстракція
Адресник для котів і собак металевий круг Waudog Smart ID 3 QR паспортом Абстракція
Тренувальний снаряд для собак Puller діаметр 12.5см
Тренувальний снаряд для собак Puller діаметр 18см
Тренувальний снаряд для собак Puller діаметр 19.5см`;

const productsData = await scrapeSearch(searchEntries);
writeToFile(productsData, "search.json");
