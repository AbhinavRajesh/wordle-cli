import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import MaxLengthInputPrompt from "inquirer-maxlength-input-prompt";

export const getGuess = async (guessNumber: number) => {
  inquirer.registerPrompt("maxlength-input", MaxLengthInputPrompt);
  const { guess } = await inquirer.prompt([
    {
      type: "maxlength-input",
      message: `Enter guess #${guessNumber.toString()}`,
      name: "guess",
      maxLength: 5,
      validate: (input: string) => {
        if (input.length === 0) return "Enter some text";
        else if (input.length < 5) return "Enter 5 letter word";
        else return true;
      },
    },
  ]);
  const today = new Date().toLocaleDateString("en-GB");
  const jsonData = await JSON.parse(
    fs.readFileSync(path.resolve(__dirname, "../data.json"), "utf-8")
  );
  fs.writeFileSync(
    path.resolve(__dirname, "../data.json"),
    JSON.stringify({
      word: jsonData.word,
      date: {
        ...jsonData.date,
        [today]: {
          word: jsonData.date?.[today].word,
          guesses: [...jsonData.date?.[today].guesses, guess],
        },
      },
    })
  );
  return guess.toLowerCase();
};
