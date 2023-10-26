import { DiceFace } from "./DiceFace";

export const diceDictionary: Record<string, Dice> = {};
export class Dice {
  faces: DiceFace[] = [];
  name: string = "";

  constructor(name: string, faces: (DiceFace | string | number)[]) {
    this.name = name;
    this.faces = faces.map((face) => {
      if (typeof face === "object" && "value" in face) {
        return face;
      }
      return { value: face };
    });

    if (diceDictionary[name])
      console.warn(`Dice ${name} already exists in dictionary.`);
    diceDictionary[name] = this;
  }
}
