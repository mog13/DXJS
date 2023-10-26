import {Dice} from "./Dice";

describe("when using the Dice class", () => {
	it("should be able to create a new instance", () => {
		let a = new Dice();
		expect(a).not.toBeNull();
	});
})