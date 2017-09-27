import Handfull from "./Handfull";

describe("when using a handfull", () =>{

    it("should", ()=>{
        let handfull = new Handfull("test","D2",{});
        let outcome = handfull.roll();
        expect(outcome).toBeDefined();
    });

    it("should be able to tokenize expressions", () =>{
        let handfull = new Handfull("test","2d4+1d8/3d5*1s3-9d3",{});
       expect(handfull.tokens.length).toBe(9);
    });
});