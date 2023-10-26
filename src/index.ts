import { Dice, diceDictionary } from "./Dice.js";
import { DiceFace } from "./DiceFace.js";
import { Tokenize } from "./Tokenizer";
import { parseTokens } from "./AST";
import { compute, evaluate } from "./Evaluator";

const generateDiceDictionary = () => {
  for (let i = 1; i <= 100; i++) {
    diceDictionary[`d${i}`] = new Dice(
      `d${i}`,
      Array.from({ length: i }, (_, i) => i + 1),
    );
  }
};
generateDiceDictionary();

const roll = (dice: string): number => {
  const tokens = Tokenize(dice);
  const AST = parseTokens(tokens);
  return compute(AST);
};

const rollDescriptive = (dice: string): string => {
  const tokens = Tokenize(dice);
  const AST = parseTokens(tokens);
  const result = evaluate(AST);
  const value = compute(AST);
  return `${dice} = ${result} = ${value}`;
};

export {
  Dice,
  DiceFace,
  diceDictionary,
  generateDiceDictionary,
  roll,
  rollDescriptive,
};
