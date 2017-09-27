import DiceFace from "./DiceFace";

export default class Dice {
  constructor(name,faces,historyLimit,onLand) {
      this.name = name;
      this.history = [];
      this.historyLimit = historyLimit ||100;
      this.onLand = onLand;
      this.faces = [];
      tempFaces = [].concat(faces);
      tempFaces.forEach((face)=> {
          this.faces.push(new DiceFace(face))
      })
  }
};