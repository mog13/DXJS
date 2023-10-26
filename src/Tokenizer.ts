type Token = {
  raw: string;
  value: string | number;
  type: "dice" | "number" | "operator";
};

const operators = ["+", "-", "*", "/"];

export const Tokenize = (input: string): Token[] => {
  let panic = 0;
  const tokens: Token[] = [];
  while (input.length > 0) {
    const nextChar = input[0];

    //split out into tokens for operators, numbers, and dice
    if (nextChar === " ") {
      input = input.slice(1);
    } else if (operators.includes(nextChar)) {
      tokens.push({
        raw: nextChar,
        value: nextChar,
        type: "operator",
      });
      input = input.slice(1);
    } else if (nextChar.match(/[0-9]/)) {
      const number = input.match(/[0-9]+/);
      if (number) {
        tokens.push({
          raw: number[0],
          value: parseInt(number[0]),
          type: "number",
        });
        input = input.slice(number[0].length);
      }
    } else if (nextChar.match(/[a-zA-Z]/)) {
      const dice = input.match(/[a-zA-Z0-9]+/);
      if (dice) {
        tokens.push({
          raw: dice[0],
          value: dice[0],
          type: "dice",
        });
        input = input.slice(dice[0].length);
      }
    } else {
      throw new Error(`Unknown token ${nextChar}`);
    }

    if (panic++ > 999999) {
      throw new Error("Panic, couldnt resolve tokens before 999999 attempts");
    }
  }

  return tokens;
};
