export async function getTitle(page, className) {
  let title = null;
  try {
    title = await page.$eval(className, (element) => element.textContent);
  } catch (error) {
    console.log(error.message);
  }
  return title;
}

export async function getDescription(page, className) {
  let description = null;
  try {
    description = await page.$eval(className, (element) => element.textContent);
  } catch (error) {
    console.log(error.message);
  }
  return description;
}
