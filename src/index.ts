import { Dice, diceDictionary } from "./Dice.js";
import { DiceFace } from "./DiceFace.js";
import { Tokenize } from "./Tokenizer";

export { Dice, DiceFace, diceDictionary, Tokenize };

const generateDiceDictionary = () => {
  for (let i = 1; i <= 100; i++) {
    diceDictionary[`d${i}`] = new Dice(
      `d${i}`,
      Array.from({ length: i }, (_, i) => i + 1),
    );
  }
};
generateDiceDictionary();
