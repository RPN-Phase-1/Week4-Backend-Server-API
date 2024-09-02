import { readFileSync, writeFileSync } from "fs";
import process from "process";

function registerEenv() {
  try {
    const text = readFileSync("./.env").toString();
    for (const line of text.split("\n")) {
      const [key, ...values] = line.split("=");
      const value = values.join("=").trim(); 
      const match = value.match(/^['"](.*)['"]$/);
      if (match !== null) {
        process.env[key] = match[1] as string;
      } else {
        process.env[key] = value;
      }
    }
  } catch {
    writeFileSync("./.env", "");
  }
}

registerEenv();
