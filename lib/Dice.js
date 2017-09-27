import DiceFace from "./DiceFace";

export default class Dice {
  constructor(name,faces,config) {
      this.name = name;
      this.history = [];
      this.config = config ||{};
      if(!this.config.historyLimit) this.config.historyLimit = 100;
      this.faces = [];
      let tempFaces = [].concat(faces);
      tempFaces.forEach((face)=> {
          this.faces.push(new DiceFace(face));
      })
  }

  roll() {
      let outcome =  this.faces[Math.floor(Math.random()*this.faces.length)];
      this.history = [outcome].concat(this.history);
      if (this.history.length > this.config.historyLimit) this.history.pop();
      if(this.config.onLand) {
          this.config.onLand(outcome);
      }
      return outcome;
  }

};