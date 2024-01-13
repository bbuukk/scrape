export async function getDescription(page) {
  let text = "";
  try {
    const descriptionHandle = await page.$(
      "div.product-about__description-content.text"
    );
    text = await page.evaluate((el) => el.textContent, descriptionHandle);
  } catch (e) {
    console.log(`${red}description is not found\n${flash}`);
  }

  return { Опис: text };
}
