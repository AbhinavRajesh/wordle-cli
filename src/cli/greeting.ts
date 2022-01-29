import figlet from "figlet";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";

import { sleep } from "../utils";

export const greeting = async () => {
  console.clear();
  figlet("WORDLE-CLI", (err, data) => {
    if (err) console.log("WORDLE-CLI");
    else console.log(gradient.pastel.multiline(data));
  });
  await sleep(200);

  console.log(
    "Checkout the project at https://github.com/AbhinavRajesh/wordle-cli"
  );
  const rainbowTitle = chalkAnimation.rainbow(
    "Welcome to CLI implementation of Wordle by Abhinav!\n"
  );

  await sleep();
  rainbowTitle.stop();
};
