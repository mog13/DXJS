import Dice from "./Dice";

export default class DX {
    constructor() {
        this.dice = {};
        this.addDice("D2", [1, 2]);
    }

    addDice(name, faces, historyLimit, onLand) {
        if(this.dice[name]){
            throw `A dice with the name ${name} already exists`;
        }
        else{
            return this.dice[name] = new Dice(name,faces, historyLimit,onLand);
        }
    }
    //this can be a single dice/array/new dice object
    roll(dice){
        if (typeof(dice) === "string") {
            if(this.dice[dice]) {
                return this.dice[dice].roll()
            }
            else{
                //execute the roll command
                return -1;
            }
        }
        else{
            if (Array.isArray(dice)) {
                return  dice[Math.floor(Math.random()*dice.length)]
            }
            else{
                if(dice instanceof Dice) {
                    return dice.roll();
                }
                else{
                   return this.addDice(dice.name, dice.faces,dice.historyLimit, dice.onLand).roll();
                }
            }
        }

    }
}