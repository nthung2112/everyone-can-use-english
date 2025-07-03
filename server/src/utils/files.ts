import { readdirSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const loadJsonFiles = (directory: string): { [key: string]: any } => {
  const files = readdirSync(join(__dirname, directory));
  const jsonData: { [key: string]: any } = {};

  files.forEach((file) => {
    if (file.endsWith(".json")) {
      try {
        const filePath = join(__dirname, directory, file);
        const fileContent = readFileSync(filePath, "utf-8");
        const json = JSON.parse(fileContent);
        jsonData[file.replace(".json", "")] = json;
      } catch (error) {
        console.error(`Error reading or parsing ${file}:`, error);
      }
    }
  });

  return jsonData;
};
