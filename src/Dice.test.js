import { Dice } from "./Dice";

describe("when using the Dice class", () => {
  describe("When initialising a new dice", () => {
    it("should be able to create a new instance using inline dice faces", () => {
      let a = new Dice("testDice", [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 },
        { value: 6 },
      ]);
      expect(a).not.toBeNull();
    });
    it("should be able to create a new instance using numbers", () => {
      let a = new Dice("testDice", [1, 2, 3, 4, 5, 6]);
      expect(a).not.toBeNull();
    });
    it("should be able to create a new instance using strings", () => {
      let a = new Dice("testDice", [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
      ]);
      expect(a).not.toBeNull();
    });
    it("should be able to create a new instance using a mix of types", () => {
      let a = new Dice("testDice", [
        { value: 1 },
        2,
        "three",
        { value: 4 },
        "five",
        { value: 6 },
      ]);
      expect(a).not.toBeNull();
    });
  });
});
