import DX from "./DX";
import Dice from "./Dice";

describe("When using the DX library",() =>{
    it("should have default dice", () =>{
       expect(DX.dice.d2).toBeDefined()
    });

    it("should be able to add dice", ()=> {
        DX.addDice("test",[1,2,3]);
        expect(DX.dice.test).toBeDefined();
        expect(DX.dice.test.faces.length).toBe(3);
    });

    it("should be able to add a handful", ()=> {
        DX.addHandful("test","2d2");
        expect(DX.handful.test).toBeDefined();
    });


    it("should throw an error when you try and define an already defined dice", ()=>{
      expect(()=>{DX.addDice("d2",[1,2])}).toThrow();
    });

    it("should be able to roll a single dice", ()=>{
        let outcome = DX.roll("d2");
        expect(outcome).toBeDefined();
    });

    it("should be able to roll an inline array", ()=>{
        let outcome = DX.roll([1,2,3,4]);
        expect(outcome).toBeDefined();
    });

    it("should be able to roll a Dice created elsewhere", ()=>{
        let testDice = new Dice("new dice",[1,2,3]);
        let outcome = DX.roll(testDice);
        expect(outcome).toBeDefined();
    });

    it("should be able to roll an inline new dice", ()=>{
        let outcome = DX.roll({name:"test2",faces:[1,2,3]});
        expect(outcome).toBeDefined();
        expect(DX.dice.test).toBeDefined();
    });

    it("should be able to roll an inline handful", ()=>{
        let outcome = DX.roll("3d2");
        expect(outcome).toBeDefined();
        expect(outcome.total).toBeDefined();
    });

});