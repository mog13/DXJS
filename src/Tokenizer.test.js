import { Tokenize } from "./Tokenizer";

const getToken = (type, value) => {
  return {
    type: type,
    value: value,
    raw: value.toString(),
  };
};

const getMultiDiceToken = (type, value, multiDice) => {
  return {
    type: type,
    value: value,
    raw: `${multiDice}${value}`,
    multiDice: multiDice,
  };
};

describe("when using the Tokenizer class", () => {
  it("should correctly tokenize a single dice", () => {
    let tokens = Tokenize("d6");
    expect(tokens).toEqual([getToken("dice", "d6")]);
  });
  it("should correctly tokenize a single dice with a modifier", () => {
    let tokens = Tokenize("5d6");
    expect(tokens).toEqual([getMultiDiceToken("dice", "d6", 5)]);
  });
  it("should correctly tokenize two dice with a operator", () => {
    let tokens = Tokenize("d6+d4");
    expect(tokens).toEqual([
      getToken("dice", "d6"),
      getToken("operator", "+"),
      getToken("dice", "d4"),
    ]);
  });
  it("should correctly tokenize two dice with a operator and a modifier", () => {
    let tokens = Tokenize("5d6+2d4");
    expect(tokens).toEqual([
      getMultiDiceToken("dice", "d6", 5),
      getToken("operator", "+"),
      getMultiDiceToken("dice", "d4", 2),
    ]);
  });
  it("should ignore whitespace", () => {
    let tokens = Tokenize(" 5d6 + 2d4 ");
    expect(tokens).toEqual([
      getMultiDiceToken("dice", "d6", 5),
      getToken("operator", "+"),
      getMultiDiceToken("dice", "d4", 2),
    ]);
  });
  it("should throw an error when an invalid character is used", () => {
    expect(() => Tokenize("5d6£2d4+")).toThrow("Unknown token £");
  });
});
