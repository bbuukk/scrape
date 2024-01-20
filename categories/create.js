import CyrillicToTranslit from "cyrillic-to-translit-js";
import { writeToFile } from "../utils/io/writeToFile.js";

{
  const categoryTree = [
    {
      title: "Для Собак",
      subcategories: [
        {
          title: "Корм та Смаколики",
          subcategories: [
            { title: "Сухий корм" },
            { title: "Напіввологий корм" },
            { title: "Вологий корм" },
          ],
        },
        { title: "Вітаміни" },
        { title: "Ветпрепарати" },
        { title: "Іграшки" },
        {
          title: "Одяг та Аксесуари",
          subcategories: [
            { title: "Нашийники" },
            { title: "Повідці" },
            { title: "Шлеї" },
          ],
        },
        { title: "Нашийники" },
        { title: "Повідці" },
        { title: "Шлеї" },
        {
          title: "Догляд та Гігієна",
          subcategories: [{ title: "Інструменти для грумінгу" }],
        },
        { title: "Спальні місця та перенесення" },
      ],
    },
    {
      title: "Для Котів",
      subcategories: [
        {
          title: "Корм та Смаколики",
          subcategories: [
            { title: "Сухий корм" },
            { title: "Напіввологий корм" },
            { title: "Вологий корм" },
          ],
        },
        { title: "Вітаміни" },
        { title: "Ветпрепарати" },
        { title: "Іграшки" },
        {
          title: "Одяг та Аксесуари",
          subcategories: [
            { title: "Нашийники" },
            { title: "Повідці" },
            { title: "Шлеї" },
          ],
        },
        { title: "Нашийники" },
        { title: "Повідці" },
        { title: "Шлеї" },
        {
          title: "Догляд та Гігієна",
          subcategories: [{ title: "Інструменти для грумінгу" }],
        },
        { title: "Спальні місця та перенесення" },
        { title: "Туалети" },
        { title: "Туалетні наповнювачі" },
      ],
    },
    {
      title: "Для Гризунів",
      subcategories: [
        {
          title: "Корм та Смаколики",
        },
        { title: "Вітаміни" },
        { title: "Ветпрепарати" },
        { title: "Іграшки" },
        {
          title: "Догляд та Гігієна",
        },
        { title: "Клітки та вольєри " },
        { title: "Наповнювачі" },
        { title: "Аксесуари для кліток" },
      ],
    },
    {
      title: "Для Птахів",
      subcategories: [
        {
          title: "Корм та Смаколики",
        },
        { title: "Вітаміни" },
        { title: "Ветпрепарати" },
        { title: "Іграшки" },
        {
          title: "Догляд та Гігієна",
        },
        { title: "Клітки та вольєри " },
        { title: "Наповнювачі" },
        { title: "Аксесуари для кліток" },
      ],
    },

    {
      title: "Рослини та Догляд за ними",
      subcategories: [
        {
          title: "Субстрати та грунти для рослин",
          subcategories: [
            { title: "Для бегонії" },
            { title: "Для газонів" },
            { title: "Для декоративно-листяних рослин" },
            { title: "Для кактусів" },
            { title: "Для квітучих рослин" },
            { title: "Для кімнатних рослин" },
            { title: "Для листяних дерев і чагарників" },
            { title: "Для овочевих культур" },
            { title: "Для пальм" },
            { title: "Для пеларгоній" },
            { title: "Для плодово-ягідних рослин" },
            { title: "Для розсади " },
            { title: "Для садових рослин" },
            { title: "Для тепличних рослин" },
            { title: "Для хвойних і декоративних рослин" },
            { title: "Для цибулинних" },
            { title: "Для цитрусових" },
            { title: "Універсальні" },
          ],
        },
        { title: "Садовий інвертар" },
        { title: "Вазони" },
        {
          title: "Засоби захисту рослин",
          subcategories: [
            { title: "Інсектициди" },
            { title: "Фунгіциди" },
            { title: "Гербіциди" },
            { title: "Протруйникинасіння" },
            { title: "Молюскоциди" },
            { title: "Прилипачі" },
            { title: "Десиканти" },
          ],
        },
        {
          title: "Добрива",
          subcategories: [
            { title: "Мінеральні добрива" },
            { title: "Органічні добрива" },
            { title: "Стимулятори росту рослин" },
            { title: "Біодобрива" },
            { title: "Органомінеральні добрива" },
            { title: "Мікродобрива " },
          ],
        },
      ],
    },
    {
      title: "Насіння",
      subcategories: [
        // { title: "Міцелій грибів" },
        {
          title: "Насіння овочів",
          subcategories: [
            { title: "Насіння помідорів" },
            { title: "Насіння огірків" },
            { title: "Насіння перцю" },
            { title: "Насіння капусти" },
            { title: "Насіння цибулі" },
            { title: "Насіння кавуна" },
            { title: "Насіння моркви" },
            { title: "Насіння редиски" },
            { title: "Насіння гарбуза" },
            { title: "Насіння буряка" },
            { title: "Насіння кабачків" },
            { title: "Насіння баклажанів" },
            { title: "Насіння дині" },
            { title: "Насіння салату" },
            { title: "Насіння картоплі" },
            { title: "Насіння редьки" },
            { title: "Насіння патисонів" },
            { title: "Насіння ріпи" },
            { title: "Насіння артишоку" },
          ],
        },
        { title: "Насіння квітів" },
        {
          title: "Насіння пряних і зелених трав",
          subcategories: [
            { title: "Насіння Щавелю" },
            { title: "Насіння Базиліку" },
          ],
        },
        { title: "Насіння бобових культур" },
        { title: "Насіння газонних трав" },
        { title: "Насіння сидератів і медоносів" },
        { title: "Насіння ягід" },
        { title: "Насіння зернових культур" },
        { title: "Насіння олійних культур" },
        // { title: "Насіння дерев та чагарників" },
      ],
    },
    {
      title: "Товари для дому",
      subcategories: [
        {
          title: "Зоотовари",
        },
        { title: "Побутова хімія" },
        { title: "Компостери" },
        { title: "Для поливу" },
      ],
    },
  ];

  // writeToFile(categoryTree, "categoryTree.json");

  const cyrillicToTranslit = new CyrillicToTranslit();
  const BASE_IMAGE_PATH =
    "https://storage.googleapis.com/live_world/categories/";

  function createCategoriesFromTree(categoryTree, superPath = "") {
    return categoryTree.flatMap(({ title, subcategories = [] }, index) => {
      const path = `${superPath}${title}`;

      const imagePath =
        BASE_IMAGE_PATH +
        cyrillicToTranslit
          .transform(path)
          .toLowerCase()
          .replaceAll(" ", "_")
          .replaceAll("'", "_")
          .replaceAll("`", "_")
          .replaceAll('"', "_")
          .replaceAll(",", "---") +
        ".jpg";

      const category = {
        name: title,
        path: path,
        imagePath: imagePath,
        order: index,
      };

      const subcategoryItems = createCategoriesFromTree(
        subcategories,
        `${path},`
      );

      return [category, ...subcategoryItems];
    });
  }

  const categories = createCategoriesFromTree(categoryTree);
  console.log(categories);
  writeToFile(JSON.stringify(categories, null, 2), "categories.json");
}

// function createCategoryLeafs(names) {
//   names = names.split("\n");
//   const products = [];
//   names.forEach((name) => {
//     products.push({ title: name });
//   });
//   return products;
// }

// const names = `Насіння огірків
// Насіння перцю
// Насіння помідорів
// Насіння капусти
// Насіння цибулі
// Насіння кавуна
// Насіння моркви
// Насіння редиски
// Насіння гарбуза
// Насіння буряка
// Насіння кабачків
// Насіння баклажанів
// Насіння дині
// Насіння салату
// Насіння картоплі
// Насіння редьки
// Насіння патисонів
// Насіння ріпи`;

// const leafs = createCategoryLeafs(names);
// console.log(leafs);
