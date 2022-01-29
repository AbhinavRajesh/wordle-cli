import chalk from "chalk";
import fs from "fs";
import path from "path";

export const shareResult = async (today: string) => {
  const file = fs.readFileSync(
    path.resolve(__dirname, "../data.json"),
    "utf-8"
  );
  const jsonData = JSON.parse(file);

  const referenceDate = new Date("01/29/2022").getTime();
  const diffTime: number = Math.abs(new Date().getTime() - referenceDate);
  const offsetDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const { word, guesses } = jsonData.date?.[today] as {
    word: string;
    guesses: string[];
  };
  let outputString: string = `\n\nWordle-CLI ${offsetDays}`;
  let boxes: string = "";
  let answerFound: boolean = false;
  guesses.forEach((guess) => {
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === word[i]) {
        boxes += "🟩";
      } else if (word.indexOf(guess[i]) !== -1) {
        boxes += "🟨";
      } else {
        boxes += "⬜";
      }
    }
    if (guess === word) answerFound = true;
    boxes += "\n";
  });

  if (answerFound) outputString += ` ${guesses.length}/6\n`;
  else outputString += " X/6\n";
  outputString += boxes;
  console.log(outputString);
  console.log(chalk.bold.blue("Share on twitter"));
  console.log(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(outputString)}`
  );
};
