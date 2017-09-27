import DiceFace from "./DiceFace";

describe("when i use a dice face", () => {
    it("Should be able to create a dice face with just a number", () => {
        let face = new DiceFace(1);
        expect(face.value).toBe(1);
        expect(face.label).toBe(1);
    });

    it("should be able to creat a dice face from an object", () => {
        let face = new DiceFace({value: 1, label: "One", data: {img: "one.png"}});
        expect(face.value).toBe(1);
        expect(face.label).toBe("One");
        expect(face.data.img).toBe("one.png");
    })

});