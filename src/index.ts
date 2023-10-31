import { Dice, diceDictionary } from "./Dice.js";
import { DiceFace } from "./DiceFace.js";
import { Tokenize } from "./Tokenizer";
import { parseTokens } from "./AST";
import { evaluate } from "./Evaluator";

const generateDiceDictionary = () => {
  for (let i = 1; i <= 100; i++) {
    diceDictionary[`d${i}`] = new Dice(
      `d${i}`,
      Array.from({ length: i }, (_, i) => i + 1),
    );
  }
};
generateDiceDictionary();

const roll = (dice: string) => {
  const tokens = Tokenize(dice);
  const AST = parseTokens(tokens);
  return evaluate(AST);
};

export { Dice, DiceFace, diceDictionary, generateDiceDictionary, roll };
