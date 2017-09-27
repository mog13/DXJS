import DiceGroup from "./DiceGroup";
import DX from "./DX";

describe("when using Dice groupds", () => {
    let diceGroup;
    DX.addDice("test", [1, 2, 3, 4]);

    describe("and i give valid input", () => {
        beforeEach(() => {
            diceGroup = new DiceGroup("14test");
        });
        it("should correctly identify the dice", () => {
            expect(diceGroup.diceMatch).toBe("test");
        });

        it("should correctly set the multiplier", () => {
            expect(diceGroup.multiplier).toBe(14);
        })
    });

    describe("and i give an invalid dice", () => {
        it("should correctly identify the dice", () => {
            expect(() => {
                diceGroup = new DiceGroup("34tghatehst");
            }).toThrow("Could not find matching dice for group 34tghatehst");
        });
    });

    describe("and i give an invalid multiplier",() =>{
        it("should correctly identify the dice", ()=>{
            expect(()=>{diceGroup = new DiceGroup("failtest");}).toThrow("multiplier fail is not valid");
        });
    });

    describe("and we give it no multiplier",()=> {
        beforeEach(() => {
            diceGroup = new DiceGroup("test");
        });
        it("should correctly identify the dice", () => {
            expect(diceGroup.diceMatch).toBe("test");
            expect(diceGroup.multiplier).toBe(1);
        });
    });


});