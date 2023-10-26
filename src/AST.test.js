import { parseTokens } from "./AST";

describe("when using a AST", () => {
  it("should correctly parse a single dice", () => {
    let ast = parseTokens([{ type: "dice", value: "d6" }]);
    expect(ast).toEqual({
      dice: "d6",
      type: "dice",
    });
  });
  it("should correctly parse a single dice with implicit multiplication", () => {
    let ast = parseTokens([
      { type: "number", value: 5 },
      { type: "dice", value: "d6" },
    ]);
    expect(ast).toEqual({
      left: {
        number: 5,
        type: "number",
      },
      operator: "*",
      right: {
        dice: "d6",
        type: "dice",
      },
      type: "operator",
    });
  });

  it("should correctly parse a single dice with explicit multiplication", () => {
    let ast = parseTokens([
      { type: "number", value: 5 },
      { type: "operator", value: "*" },
      { type: "dice", value: "d6" },
    ]);
    expect(ast).toEqual({
      left: {
        number: 5,
        type: "number",
      },
      operator: "*",
      right: {
        dice: "d6",
        type: "dice",
      },
      type: "operator",
    });
  });

  it("should correctly parse complicated multi operator expressions", () => {
    let ast = parseTokens([
      { type: "number", value: 5 },
      { type: "dice", value: "d6" },
      { type: "operator", value: "+" },
      { type: "number", value: 2 },
      { type: "dice", value: "d4" },
    ]);
    expect(ast).toEqual({
      left: {
        left: {
          number: 5,
          type: "number",
        },
        operator: "*",
        right: {
          dice: "d6",
          type: "dice",
        },
        type: "operator",
      },
      operator: "+",
      right: {
        left: {
          number: 2,
          type: "number",
        },
        operator: "*",
        right: {
          dice: "d4",
          type: "dice",
        },
        type: "operator",
      },
      type: "operator",
    });
  });

  it("should correctly parse expressions with severall multiplications", () => {
    const ast = parseTokens([
      { type: "number", value: 5 },
      { type: "operator", value: "*" },
      { type: "number", value: 2 },
      { type: "operator", value: "*" },
      { type: "number", value: 3 },
      { type: "operator", value: "*" },
      { type: "number", value: 4 },
      { type: "operator", value: "*" },
      { type: "number", value: 5 },
    ]);
    expect(ast).toEqual({
      left: {
        left: {
          left: {
            left: {
              number: 5,
              type: "number",
            },
            operator: "*",
            right: {
              number: 2,
              type: "number",
            },
            type: "operator",
          },
          operator: "*",
          right: {
            number: 3,
            type: "number",
          },
          type: "operator",
        },
        operator: "*",
        right: {
          number: 4,
          type: "number",
        },
        type: "operator",
      },
      operator: "*",
      right: {
        number: 5,
        type: "number",
      },
      type: "operator",
    });
  });
  it("should handle error cases", () => {
    let ast = parseTokens([
      { type: "number", value: 5 },
      { type: "dice", value: "d6" },
      { type: "dice", value: "d6" },
      { type: "dice", value: "d6" },
    ]);
    expect(ast).toBeDefined();
  });
});
