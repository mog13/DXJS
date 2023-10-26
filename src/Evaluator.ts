import { ASTNode, DiceNode, NumberNode, OperatorNode } from "./AST";
import { diceDictionary } from "./Dice";

export const evaluate = (node: ASTNode): string => {
  switch (node.type) {
    case "operator":
      return evaluateOperator(node as OperatorNode);
    case "dice":
      return evaluateDice(node as DiceNode);
    case "number":
      return (node as NumberNode).number.toString();
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
};

const evaluateOperator = (node: OperatorNode): string => {
  const left = evaluate(node.left);
  const right = evaluate(node.right);
  return `${left} ${node.operator} ${right}`;
};

export const evaluateDice = (node: DiceNode): string => {
  const dice = node.dice;
  const multiDice = node.multiDice || 1;
  const diceObject = diceDictionary[dice];
  if (!diceObject) {
    throw new Error(`Unknown dice ${dice}`);
  }
  let total = "";
  for (let i = 0; i < multiDice; i++) {
    const roll = diceObject.roll();
    total += `${i !== 0 ? " + " : ""}${roll.value}`;
  }
  return multiDice === 1 ? total : `(${total})`;
};

export const compute = (node: ASTNode): number => {
  switch (node.type) {
    case "operator":
      return computeOperator(node as OperatorNode);
    case "dice":
      return computeDice(node as DiceNode);
    case "number":
      return (node as NumberNode).number;
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
};

const computeOperator = (node: OperatorNode): number => {
  const left = compute(node.left);
  const right = compute(node.right);
  switch (node.operator) {
    case "+":
      return left + right;
    case "-":
      return left - right;
    case "*":
      return left * right;
    case "/":
      return left / right;
    default:
      throw new Error(`Unknown operator: ${node.operator}`);
  }
};

const computeDice = (node: DiceNode): number => {
  const dice = node.dice;
  const multiDice = node.multiDice || 1;
  const diceObject = diceDictionary[dice];
  if (!diceObject) {
    throw new Error(`Unknown dice ${dice}`);
  }
  let total = 0;
  for (let i = 0; i < multiDice; i++) {
    const roll = diceObject.roll();
    if (typeof roll.value === "number") {
      total += Number(roll.value);
    }
  }
  return total;
};
