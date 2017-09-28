import Dice from "./Dice";
import Handful from "./Handful";
class DX {
    constructor() {
        this.dice = {};
        this.handful = {};
        this.generateDice(100)
    }

    generateDice(n) {
        for(let i =2; i <=n; i++) {
            this.addDice(`d${i}`,[...Array(i+1).keys()].splice(1))
        }
    }

    addDice(name, faces, config) {
        if (this.dice[name]) {
            throw `A dice with the name ${name} already exists`;
        }
        else {
            return this.dice[name] = new Dice(name, faces, config);
        }
    }

    addHandful(name, expression, config){
        if (this.handful[name]) {
            throw `A handful with the name ${name} already exists`;
        }
        else {
            return this.handful[name] = new Handful(name, expression, config);
        }
    }

    //this can be a single dice/array/new dice object/handful
    roll(dice) {
        if (typeof(dice) === "string") {
            if (this.dice[dice]) {
                return this.dice[dice].roll()
            }
            else {
                if (this.handful[dice]) {
                    return this.handful[dice].roll()
                }
                else{
                    return new Handful(null,dice,{}).roll();
                }
            }
        }
        else {
            if (Array.isArray(dice)) {
                return dice[Math.floor(Math.random() * dice.length)]
            }
            else {
                if (dice instanceof Dice) {
                    return dice.roll();
                }
                else {
                    return this.addDice(dice.name, dice.faces, dice.historyLimit, dice.onLand).roll();
                }
            }
        }

    }
}

export default new DX();
