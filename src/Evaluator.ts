import { ASTNode, DiceNode, NumberNode, OperatorNode } from "./AST";
import { diceDictionary } from "./Dice";

type EvaluationResult = { value: number; evaluation: string };

export const evaluate = (node: ASTNode): EvaluationResult => {
  const numberNode = node as NumberNode;
  switch (node.type) {
    case "operator":
      return evaluateOperator(node as OperatorNode);
    case "dice":
      return evaluateDice(node as DiceNode);
    case "number":
      return {
        evaluation: numberNode.number.toString(),
        value: numberNode.number,
      };
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
};

const evaluateOperator = (node: OperatorNode): EvaluationResult => {
  const left = evaluate(node.left);
  const right = evaluate(node.right);
  let computationResult: number | null = null;
  switch (node.operator) {
    case "+":
      computationResult = left.value + right.value;
      break;
    case "-":
      computationResult = left.value - right.value;
      break;
    case "*":
      computationResult = left.value * right.value;
      break;
    case "/":
      computationResult = left.value / right.value;
      break;
    default:
      throw new Error(`Unknown operator: ${node.operator}`);
  }
  return {
    evaluation: `${left.evaluation} ${node.operator} ${right.evaluation}`,
    value: computationResult,
  };
};

export const evaluateDice = (node: DiceNode): EvaluationResult => {
  const dice = node.dice;
  const multiDice = node.multiDice || 1;
  const diceObject = diceDictionary[dice];
  if (!diceObject) {
    throw new Error(`Unknown dice ${dice}`);
  }
  let totalEval = "";
  let totalValue = 0;
  for (let i = 0; i < multiDice; i++) {
    const roll = diceObject.roll();
    totalEval += `${i !== 0 ? " + " : ""}${roll.value}`;
    if (typeof roll.value === "number") {
      totalValue += Number(roll.value);
    }
  }
  return {
    evaluation: multiDice === 1 ? totalEval : `(${totalEval})`,
    value: totalValue,
  };
};
