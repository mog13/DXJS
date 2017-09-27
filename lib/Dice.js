import DiceFace from "./DiceFace";

export default class Dice {
  constructor(name,faces,historyLimit,onLand) {
      this.name = name;
      this.history = [];
      this.historyLimit = historyLimit ||100;
      this.onLand = onLand;
      this.faces = [];
      let tempFaces = [].concat(faces);
      tempFaces.forEach((face)=> {
          this.faces.push(new DiceFace(face));
      })
  }

  roll() {
      let outcome =  this.faces[Math.floor(Math.random()*this.faces.length)];
      this.history = [outcome].concat(this.history);
      if (this.history.length > this.historyLimit) this.history.pop();
      if(this.onLand) {
          this.onLand(outcome);
      }
      return outcome;
  }

};