import Dice from "./Dice";

let onLand, dice;
describe("when using a Dice", () => {

    beforeEach(() => {
        onLand = jasmine.createSpy();
        dice = new Dice("d2", [1, 2],{historyLimit:4, onLand:onLand.bind(this)});
    });

    it("the dice should be able to be rolled", () => {
        let outcome = dice.roll();
        expect(outcome).not.toBeNull()
    });

    it("should limit the amount of history it stores", () => {
        expect(dice.history.length).toBe(0);
        dice.roll();
        expect(dice.history.length).toBe(1);
        dice.roll();
        dice.roll();
        dice.roll();
        dice.roll();
        expect(dice.history.length).toBe(4);
    });

    it("should call the on land function when its rolled", () =>{
        dice.roll();
        expect(onLand).toHaveBeenCalled();
    })

});