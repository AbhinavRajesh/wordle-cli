import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import data from "../data.json";

export const setName = async () => {
  const { name } = await inquirer.prompt([
    {
      type: "input",
      message: "Enter your name: ",
      name: "name",
    },
  ]);
  const newData = {
    ...data,
    name,
  };
  fs.writeFileSync(
    path.resolve(__dirname, "../data.json"),
    JSON.stringify(newData)
  );
};
