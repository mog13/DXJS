import { DiceFace } from "./DiceFace";

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
  }
}
