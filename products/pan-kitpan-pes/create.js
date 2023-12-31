import { writeToFile } from "../../utils/writeToFile.js";

const productTemplate = "";

const names = `
Корм для собак Пан-ПесЛайт 10 кг.
Корм для собак Пан-Пес Стандарт 10 кг

TM ASI KİT ACOPTI 12kr
Корм для котів Пан-Кіт Мікс 10кг
Корм для котів Пан-Кіт для кошенят Класік 10 кг
Корм для котів Пан Кіт 10 кг Курка
Корм для котів Пан Кіт 10 кг Яловичина
Kit PetFood SENSETIVE DIGENSTIVE SYSTEM 1,5 kr
Kim PetFood INASTIVE 1,5 кг.
Пан-Кіт паучі з яловичиною 100гр
Пан-Кіт паучі з індичкою в соусі 100гр
Пан-Кіт паучі з рибою в соусі 100 гр
Пан-Кіт паучі з соковитим кроликом 100гр
Пан-Кіт паучі з соковитою куркою 100гр
Пан-Кіт паучі Качка в желе 100 гр
Пан-Кіт паучі Рагу птиця овочі 100гр
Пан-Кіт паучі Ягня в соусі для кошенят 100гр

Пісок для котів БарсNo1 5кг
Пісок для котів БарсNo3 5кг
Пісок для котів БарсNo4 5кг
Пісок для котів БарсNo6 2,5кг
Пісок для котів БарсNo7 2,5кг
Пісок для котів БарсNo2 5кг
`;

const namesMap = {
  "657d66763880e95d26c1340e": `Корм для собак Пан-ПесЛайт 10 кг.
  Корм для собак Пан-Пес Стандарт 10 кг`,
  "657d7ad93880e95d26c13436": `TM ASI KİT ACOPTI 12kr
  Корм для котів Пан-Кіт Мікс 10кг
  Корм для котів Пан-Кіт для кошенят Класік 10 кг
  Корм для котів Пан Кіт 10 кг Курка
  Корм для котів Пан Кіт 10 кг Яловичина
  Kit PetFood SENSETIVE DIGENSTIVE SYSTEM 1,5 kr
  Kim PetFood INASTIVE 1,5 кг.
  Пан-Кіт паучі з яловичиною 100гр
  Пан-Кіт паучі з індичкою в соусі 100гр
  Пан-Кіт паучі з рибою в соусі 100 гр
  Пан-Кіт паучі з соковитим кроликом 100гр
  Пан-Кіт паучі з соковитою куркою 100гр
  Пан-Кіт паучі Качка в желе 100 гр
  Пан-Кіт паучі Рагу птиця овочі 100гр
  Пан-Кіт паучі Ягня в соусі для кошенят 100гр`,
  "657d7ad93880e95d26c1343b": `Пісок для котів БарсNo1 5кг
  Пісок для котів БарсNo3 5кг
  Пісок для котів БарсNo4 5кг
  Пісок для котів БарсNo6 2,5кг
  Пісок для котів БарсNo7 2,5кг
  Пісок для котів БарсNo2 5кг`,
};

let products = [];

Object.entries(namesMap).forEach(([categoryId, namesString]) => {
  const namesArray = namesString.split("\n");
  namesArray.forEach((name) => {
    const product = {
      brand: "pan-kitpan-pes",
      name: name,
      category: categoryId,
      description: "todo",
      imageUrl: "todo",
      characteristics: {},
      price: 0,
      left: 0,
    };
    products.push(product);
  });
});

writeToFile(products, "index.json");
