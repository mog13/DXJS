import { compute, evaluate } from "./Evaluator";
import { Dice } from "./Dice";

new Dice("testDice", [1, 1, 1, 1, 1, 1]);
describe("when evaluating a AST", () => {
  it("should correctly evaluate a simple equation", () => {
    let result = evaluate({
      type: "operator",
      operator: "*",
      left: { type: "number", number: 5 },
      right: { type: "number", number: 2 },
    });
    expect(result).toEqual("5 * 2");
  });
  it("should correctly evaluate a simple equation with a dice", () => {
    let result = evaluate({
      type: "operator",
      operator: "*",
      left: { type: "number", number: 5 },
      right: { type: "dice", dice: "testDice" },
    });
    expect(result).toEqual("5 * 1");
  });

  it("should correctly evaluate multi dice", () => {
    let result = evaluate({
      type: "operator",
      operator: "*",
      left: { type: "number", number: 5 },
      right: { type: "dice", dice: "testDice", multiDice: 4 },
    });
    expect(result).toEqual("5 * (1 + 1 + 1 + 1)");
  });
});

describe("when computing a AST", () => {
  it("should correctly compute a simple equation", () => {
    let result = compute({
      type: "operator",
      operator: "*",
      left: { type: "number", number: 5 },
      right: { type: "number", number: 2 },
    });
    expect(result).toEqual(10);
  });

  it("should correctly compute a simple equation with a dice", () => {
    let result = compute({
      type: "operator",
      operator: "*",
      left: { type: "number", number: 5 },
      right: { type: "dice", dice: "testDice" },
    });
    expect(result).toEqual(5);
  });

  it("should correctly compute multi dice", () => {
    let result = compute({
      type: "operator",
      operator: "*",
      left: { type: "number", number: 5 },
      right: { type: "dice", dice: "testDice", multiDice: 4 },
    });
    expect(result).toEqual(20);
  });
});
