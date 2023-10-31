import { Dice, diceDictionary } from "./Dice";

describe("when using the Dice class", () => {
  describe("When initialising a new dice", () => {
    it("should be able to create a new instance using inline dice faces", () => {
      let faceDice = new Dice("testDice", [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 6 },
      ]);
      expect(faceDice).not.toBeNull();
    });
    it("should be able to create a new instance using numbers", () => {
      let numberDice = new Dice("testDice", [1, 2, 3, 4, 5, 6]);
      expect(numberDice).not.toBeNull();
    });
    it("should be able to create a new instance using strings", () => {
      let stringDice = new Dice("testDice", [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
      ]);
      expect(stringDice).not.toBeNull();
    });
    it("should be able to create a new instance using a mix of types", () => {
      let mixedDice = new Dice("testDice", [
        { value: 1 },
        2,
        "three",
        { value: 4 },
        "five",
        { value: 6 },
      ]);
      expect(mixedDice).not.toBeNull();
    });
    it("should add to the dice dictionary when initialised", () => {
      new Dice("testDice", [1, 2, 3, 4, 5, 6]);
      expect(diceDictionary["testDice"]).not.toBeNull();
    });
  });
});
