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

  //   const productsLandingUrls = await (async function GetProductLandingUrls() {
  //     let urls = [];
  //     const searchEntriesArray = searchEntries.split("\n");
  //     for (const entry of searchEntriesArray) {
  //       const url = await searchFor(entry);
  //       urls.push(url);
  //     }
  //     return urls;
  //   })();

  //   for debug
  const productsLandingUrls = [
    {
      name: "Модульний будиночок для котів Телепет",
      url: "https://rozetka.com.ua/ua/346044016/p346044016/",
    },
  ];
  await page.goto("https://rozetka.com.ua/ua/346044016/p346044016/", {
    waitUntil: "domcontentloaded",
  });

  const products = [];

  page.setCacheEnabled(false);
  for (const productInfo of productsLandingUrls) {
    let product = { name: productInfo.name };
    if (productInfo.url) {
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

      product.image = await (async function getImage() {
        const categorySplitted = product.category.split(",");
        let folderName = categorySplitted[categorySplitted.length - 2];

        const cyrillicToTranslit = new CyrillicToTranslit();

        folderName = cyrillicToTranslit
          .transform(folderName)
          .toLowerCase()
          .split(" ")
          .join("_");

        let fileName = cyrillicToTranslit
          .transform(product.name)
          .toLowerCase()
          .split(" ")
          .join("_");

        try {
          const images = await page.$$("img.picture-container__picture");
          const imgsUrl = [];
          for (const img of images) {
            let u = await page.evaluate((img) => img.src, img);
            // u = u.replace("big", "original");
            imgsUrl.push(u);
          }

          //   https://content.rozetka.com.ua/goods/images/big/289674671.jpg

          //   for (const [index, img] of images.entries()) {
          // const imgUrl = await page.evaluate((img) => img.src, img);

          console.log(imgsUrl);

          const response = await page.waitForResponse(
            (response) => imgsUrl.includes(response.url()),
            //   response.request().resourceType() === "image",
            { timeout: 5000 }
          );
          console.log(response.url());

          // fileName = `${fileName}_${index}.${extension}`;
          // const extension = imgUrl.split(".").pop();

          // console.log(response.url());

          // const buffer = await response.buffer();

          // const filePath = path.resolve(__dirname, folderName, fileName);

          // if (!fs.existsSync(path.dirname(filePath))) {
          //   await mkdir(path.dirname(filePath), { recursive: true });
          // }
          // fs.writeFileSync(filePath, buffer, "binary");
          //   }
        } catch (e) {
          console.log(`${red}${e.message}\n${flash}`);
        }

        return `${folderName}/${fileName}`;
      })();

      //   page.setCacheEnabled(false);
      //   product.image = await (async function getImage() {
      //     const categorySplitted = product.category.split(",");
      //     console.log(categorySplitted);
      //     let folderName = categorySplitted[categorySplitted.length - 2];
      //     console.log(folderName);

      //     const cyrillicToTranslit = new CyrillicToTranslit();
      //     // const folderName = cyrillicToTranslit.transform().toLowerCase();
      //     folderName = cyrillicToTranslit
      //       .transform(folderName)
      //       .toLowerCase()
      //       .split(" ")
      //       .join("_");

      //     let fileName = cyrillicToTranslit
      //       .transform(product.name)
      //       .toLowerCase()
      //       .split(" ")
      //       .join("_");

      //     try {
      //       const img = await page.$("img.picture-container__picture");

      //       const imgUrl = await page.evaluate((img) => img.src, img);
      //       console.log(imgUrl);
      //       const extension = imgUrl.split(".").pop();

      //       fileName = `${fileName}.${extension}`;

      //       const response = await page.waitForResponse(
      //         (response) =>
      //           response.url() === imgUrl &&
      //           response.request().resourceType() === "image",
      //         { timeout: 5000 }
      //       );

      //       const buffer = await response.buffer();

      //       // Resolve the file path
      //       const filePath = path.resolve(__dirname, folderName, fileName);

      //       if (!fs.existsSync(path.dirname(filePath))) {
      //         await mkdir(path.dirname(filePath), { recursive: true });
      //       }
      //       // Write the image data to a file
      //       fs.writeFileSync(filePath, buffer, "binary");
      //     } catch (e) {
      //       console.log(`${red}${e.message}\n${flash}`);
      //     }

      //     return `${folderName}/${fileName}`;
      //   })();

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
    } else {
      console.log(`${red}${productInfo.name} NOT FOUND\n${flash}${terminator}`);
    }

    console.log(product, `\n${terminator}`);
    products.push(product);
  }

  return products;
}

async function searchFor(entry) {
  const searchForm = await page.$("form.search-form");

  const inputField = await searchForm.$("input[name='search']");
  await new Promise((r) => setTimeout(r, 1000)); //time delay to mimic human slowness
  await inputField.type(entry);

  const submitButton = await searchForm.$("button.button");
  await Promise.all([
    submitButton.click(),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
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
//   writeToFile(productsData, "scrape.json");
