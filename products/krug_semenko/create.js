import { writeToFile } from "../../utils/writeToFile.js";

const names = `Корм "Золотко" для гризунів Хомяк 550 гр
Корм "Золотко" для гризунів 500гр
Корм "Золотко" для канарок 500 гр
Корм "Золотко" для птиці Просо 500гр
Корм "Золотко" для папуг Стандартний раціон 500гр
Корм "Золотко" для папуг Малих та середніх 500гр.
Корм "Золотко" для папуг Суперменю 500г
Корм "Золотко" для папуг Фруктове асорті 500гр
Корм "Золотко" для папуг Квітковий 500гр
Корм "Золотко" для папуг Кальцій та фосфор 500гр
Нашийник NEWСуперХЕЛП (35см)для котів (коричневий)
Нашийник NEWСуперХЕЛП (35см)для котів (червоний)
Нашийник NEWСуперХЕЛП (45см)для середніх собак (червоний)`;

const categories = {
  Нашийник: "657d6b203880e95d26c1341f",
  Корм: "657d7ff93880e95d26c13466",
};

let products = [];
const namesArray = names.split("\n");

namesArray.forEach((name) => {
  const category = categories[name.split(" ")[0]];
  const product = {
    brand: "Level_xoztovaru",
    name: name,
    category: category,
    description: "todo",
    imageUrl: "todo",
    characteristics: {},
    price: 0,
    left: 0,
  };
  products.push(product);
});

writeToFile(products, "index.json");
