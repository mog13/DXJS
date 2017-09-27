import Handfull from "./Handful";

describe("when using a handful", () =>{

    it("should be able to tokenize expressions", () =>{
        let handful = new Handfull("test","2d2+1d2/3d2*1d2-9d2",{});
       expect(handful.tokens.length).toBe(9);
    });

    describe("and i am executing divisor tokens", ()=>{
        let tokens, output;
        let handful = new Handfull("test","d2",{});
        beforeEach(()=>{
            tokens = [{val:2},{type:"op", val:"/"},{val:4}];
            output = handful.handleOpToken(tokens, "/");
        });
        it("should remove the pre/proceeding tokens and fill it with the output",()=>{
            expect(output.length).toBe(1);
            expect(output[0].val).toBe(0.5);
        });
    });

    describe("and i am executing multiplication tokens", ()=>{
        let tokens, output;
        let handful = new Handfull("test","d2",{});
        beforeEach(()=>{
            tokens = [{val:2},{type:"op", val:"*"},{val:4}];
            output = handful.handleOpToken(tokens, "*");
        });
        it("should remove the pre/proceeding tokens and fill it with the output",()=>{
            expect(output.length).toBe(1);
            expect(output[0].val).toBe(8);
        });
    });

    describe("and i am executing subtraction tokens", ()=>{
        let tokens, output;
        let handful = new Handfull("test","d2",{});
        beforeEach(()=>{
            tokens = [{val:2},{type:"op", val:"-"},{val:4}];
            output = handful.handleOpToken(tokens, "-");
        });
        it("should remove the pre/proceeding tokens and fill it with the output",()=>{
            expect(output.length).toBe(1);
            expect(output[0].val).toBe(-2);
        });
    });

    describe("and i am executing addition tokens", ()=>{
        let tokens, output;
        let handful = new Handfull("test","d2",{});
        beforeEach(()=>{
            tokens = [{val:2},{type:"op", val:"+"},{val:4}];
            output = handful.handleOpToken(tokens, "+");
        });
        it("should remove the pre/proceeding tokens and fill it with the output",()=>{
            expect(output.length).toBe(1);
            expect(output[0].val).toBe(6);
        });
    });

    describe("and i roll a handfull", ()=>{
        let output;
        let handful = new Handfull("test","3d2+2d2-3d2/1d2*3d2",{});
        beforeEach(()=>{
            output = handful.roll();
        });

        it("should provide a total", ()=>{
            expect(output.total).toBeDefined();
            expect(Number.isNaN(output.total)).toBe(false);
        });
        it("should give individual rolls", ()=>{
            expect(output.rolls.length).toBe(5);
        });
        it("should show the input", ()=>{
            expect(output.input).toBe("3d2+2d2-3d2/1d2*3d2");
        });
        it("should show a readable label", ()=>{
            expect(output.label).toMatch(/(\([0-9+\-*\/]*\)[+\-*\/])*\([0-9+\-*\/]*\)/);
        });

    });

});