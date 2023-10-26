import { Operator, Token } from "./Tokenizer";

type Node = OperatorNode | DiceNode | NumberNode | BaseNode;
interface BaseNode {
  type: "operator" | "dice" | "number" | "empty";
}
interface OperatorNode extends BaseNode {
  type: "operator";
  operator: Operator;
  left: BaseNode;
  right: BaseNode;
}

interface DiceNode extends BaseNode {
  type: "dice";
  dice: string;
}

interface NumberNode extends BaseNode {
  type: "number";
  number: number;
}

export const parseTokens = (tokens: Token[]): Node => {
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
    left: Node,
    nextToken: Token | null,
  ): boolean {
    if (left.type === "number" && nextToken?.type === "dice") {
      return true;
    }

    // Add more cases as needed
    return false;
  }
  function parseMultiplicativeTerms(): Node {
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

  function parseAmounts(): Node {
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
      } as DiceNode;
    } else {
      throw new Error("Unexpected token");
    }
  }

  return parseAdditiveTerms();
};
