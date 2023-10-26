import { Operator, Token } from "./Tokenizer";

export type ASTNode = OperatorNode | DiceNode | NumberNode | BaseNode;
export interface BaseNode {
  type: "operator" | "dice" | "number" | "empty";
}
export interface OperatorNode extends BaseNode {
  type: "operator";
  operator: Operator;
  left: BaseNode;
  right: BaseNode;
}

export interface DiceNode extends BaseNode {
  type: "dice";
  dice: string;
  multiDice: number;
}

export interface NumberNode extends BaseNode {
  type: "number";
  number: number;
}

export const parseTokens = (tokens: Token[]): ASTNode => {
  let tokenIndex = 0;

  const peekToken = (): Token | null => {
    if (tokenIndex < tokens.length) {
      return tokens[tokenIndex];
    }
    return null;
  };

  function parseAdditiveTerms(): BaseNode {
    let left = parseMultiplicativeTerms();

    while (peekToken()?.value === "+" || peekToken()?.value === "-") {
      const operatorToken = peekToken();
      tokenIndex++;
      const right = parseMultiplicativeTerms();
      left = {
        type: "operator",
        operator: operatorToken!.value as Operator,
        left,
        right,
      };
    }

    return left;
  }

  function isImplicitMultiplication(
    left: ASTNode,
    nextToken: Token | null,
  ): boolean {
    if (left.type === "number" && nextToken?.type === "dice") {
      return true;
    }

    // Add more cases as needed
    return false;
  }
  function parseMultiplicativeTerms(): ASTNode {
    let left = parseAmounts();

    while (
      peekToken()?.value === "*" ||
      peekToken()?.value === "/" ||
      isImplicitMultiplication(left, peekToken())
    ) {
      let operator = "*"; // Default to multiplication for implicit case
      if (peekToken()?.value === "*" || peekToken()?.value === "/") {
        operator = peekToken()!.value as "*" | "/";
        tokenIndex++; // Only advance if we had an explicit '*' or '/'
      }

      const right = parseAmounts();
      left = {
        type: "operator",
        operator: operator,
        left,
        right,
      };
    }

    return left;
  }

  function parseAmounts(): ASTNode {
    const token = peekToken();
    tokenIndex++;

    if (!token) {
      return { type: "empty" };
    }
    if (token.type === "number") {
      return {
        type: "number",
        number: token.value,
      } as NumberNode;
    } else if (token.type === "dice") {
      return {
        type: "dice",
        dice: token.value,
        multiDice: token.multiDice || 1,
      } as DiceNode;
    } else {
      throw new Error("Unexpected token");
    }
  }

  return parseAdditiveTerms();
};
