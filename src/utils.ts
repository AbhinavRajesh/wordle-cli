import data from "./data.json";

interface DateData {
  guesses: string[];
  word: string;
}

interface DataInterface {
  name: string;
  date: {
    [date: string]: DateData;
  };
}

export const sleep = (ms: number = 2000) =>
  new Promise((r) => setTimeout(r, ms));

export default data as any as DataInterface;
