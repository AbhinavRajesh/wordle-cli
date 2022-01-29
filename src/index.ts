#!/usr/bin/env node

import fs from "fs";
import chalk from "chalk";
import path from "path";

import data from "./utils";
import { setName } from "./cli/setName";
import { setWord } from "./cli/setWord";
import { displayGuess } from "./cli/displayGuess";
import { getGuess } from "./cli/getGuess";
import { shareResult } from "./cli/shareResult";
import { greeting } from "./cli/greeting";

const main = async () => {
  await greeting();

  // Ask user's name if not present in file
  if (data.name?.length === 0) {
    await setName();
  }
  const today = new Date();
  const todayString: string = today.toLocaleDateString("en-GB");
  if (typeof data?.date?.[todayString] === "undefined") {
    // Get word for the day from the file
    await setWord(today);
  }

  // Word for the day
  const fileData = data?.date?.[todayString];
  let guesses: string[] = [];
  let word: string = "";
  if (fileData && fileData?.word && fileData?.guesses) {
    word = fileData.word;
    guesses = fileData.guesses;
  } else {
    const fileContent = fs.readFileSync(
      path.resolve(__dirname, "./data.json"),
      "utf-8"
    );
    const jsonData = await JSON.parse(fileContent);
    word = jsonData.date[todayString].word;
  }
  // Flag to check if the answer is found
  let answerFound: boolean = false;
  if (guesses) {
    console.log(chalk.greenBright.bold("Previous Guesses"));
    guesses?.forEach((guess, i) => {
      console.log("Guess " + chalk.green.bold(`#${i + 1}`));
      if (guess === word) answerFound = true;
      displayGuess(word, guess);
    });
  }

  let totalGuesses = guesses.length === 0 ? 1 : guesses.length;
  console.log(totalGuesses);
  while (totalGuesses <= 6 && !answerFound) {
    const guess: string = await getGuess(totalGuesses);
    displayGuess(word, guess);
    if (guess === word) {
      answerFound = true;
    }
    totalGuesses++;
  }
  if (answerFound) {
    console.log(
      chalk.green.bold("Congratulations! You have found the word for the day")
    );
  } else if (!answerFound && totalGuesses >= 6) {
    console.log(chalk.red.bold("Number of guesses exhausted!"));
  }
  console.log("The word was: ", chalk.greenBright.bold(word));
  shareResult(todayString);
};

main()
  .then(() => "Hope you enjoyed the game :)")
  .catch((err) => console.error(err));
