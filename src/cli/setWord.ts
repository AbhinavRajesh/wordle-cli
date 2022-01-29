import fs from "fs";
import path from "path";

import data from "../utils";
import { words } from "../message";

export const setWord = async (today: Date) => {
  const referenceDate = new Date("01/29/2022").getTime();
  const diffTime: number = Math.abs(today.getTime() - referenceDate);
  const offsetDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const newData: typeof data = {
    name: data.name,
    date: {
      ...data.date,
      [today.toLocaleDateString("en-GB")]: {
        word: words[offsetDays % words.length],
        guesses: [],
      },
    },
  };
  await fs.writeFileSync(
    path.resolve(__dirname, "../data.json"),
    JSON.stringify(newData)
  );
};
