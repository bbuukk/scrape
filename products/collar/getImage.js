import CyrillicToTranslit from "cyrillic-to-translit-js";

import fs from "fs";
import { mkdir } from "fs/promises";

import * as path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function getImage(page, product) {
  const imagesPaths = [];

  const { folderName, fileName } = getImagePath(product);

  try {
    const imagesUrlsArray = Array.from(imagesUrls);
    for (let index = 0; index < imagesUrlsArray.length; index++) {
      const imageUrl = imagesUrlsArray[index];

      const extension = imageUrl.split(".").pop();
      fileName = `${fileName}_${index}.${extension}`;

      const responsePromise = page.waitForResponse(
        (response) => response.url() === imageUrl,
        { timeout: 5000 }
      );

      await page.goto(imageUrl, {
        waitUntil: "domcontentloaded",
      });

      const response = await responsePromise;

      saveImageFile(response, folderName, fileName);
      imagesPaths.push(`${folderName}/${fileName}`);
    }
  } catch (e) {
    console.log(`${red}${e.message}\n${flash}`);
  }
  return imagesPaths;
}

function getImagePath(product) {
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

  return { folderName, fileName };
}

async function saveImageFile(response, folderName, fileName) {
  const buffer = await response.buffer();
  const filePath = path.resolve(__dirname, folderName, fileName);

  if (!fs.existsSync(path.dirname(filePath))) {
    await mkdir(path.dirname(filePath), { recursive: true });
  }
  fs.writeFileSync(filePath, buffer, "binary");
}
