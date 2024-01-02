import { writeFile } from "fs/promises";

export async function writeToFile(data, path) {
  try {
    await writeFile(path, JSON.stringify(data, null, 2));
    console.log("Data written to file");
  } catch (error) {
    console.error(`Error writing data to file: ${error}`);
  }
}
