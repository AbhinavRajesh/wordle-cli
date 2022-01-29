import chalk from "chalk";

export const displayGuess = (word: string, guess: string) => {
  const backgroundColors: string[] = [];
  for (let i = 0; i < word.length; i++) {
    if (word[i] === guess[i]) backgroundColors.push("green");
    else if (word.indexOf(guess[i]) !== -1) backgroundColors.push("yellow");
    else backgroundColors.push("white");
  }
  let finalLog = "";
  guess.split("").forEach((character, i) => {
    if (backgroundColors[i] === "green")
      finalLog += chalk.black.bold.bgGreen(` ${character} `);
    else if (backgroundColors[i] === "yellow")
      finalLog += chalk.black.bold.bgYellow(` ${character} `);
    else finalLog += chalk.black.bold.bgWhite(` ${character} `);
    finalLog += " ";
  });
  console.log(finalLog);
};
