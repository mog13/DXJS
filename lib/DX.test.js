import dx from "./DX";
import Dice from "./Dice";
let DX;
describe("When using the DX library",() =>{
    beforeEach(()=>{
        DX = new dx();
    });

    it("should have default dice", () =>{
       expect(DX.dice.D2).toBeDefined()
    });

    it("should be able to add dice", ()=> {
        DX.AddDice("test",[1,2,3]);
        expect(DX.dice.test).toBeDefined();
        expect(DX.dice.test.faces.length).toBe(3);
    });

    it("should throw an error when you try and define an already defined dice", ()=>{
      expect(()=>{DX.addDice("D2",[1,2])}).toThrow();
    });

    it("should be able to roll a single dice", ()=>{
        let outcome = DX.roll("D2");
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
        let outcome = DX.roll({name:"test",faces:[1,2,3]});
        expect(outcome).toBeDefined();
        expect(DX.dice.test).toBeDefined();
    });

});