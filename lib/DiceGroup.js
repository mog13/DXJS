import DX from "./DX";

export default class DiceGroup {
    constructor(group) {
        this.group = group;
        this.diceMatch = null;
        for (let dice in DX.dice) {
            if (DX.dice.hasOwnProperty(dice)) {
                if (this.group.indexOf(dice) >= 0) {
                    this.diceMatch = dice;
                }
            }
        }
        if (this.diceMatch === null) throw `Could not find matching dice for group ${this.group}`;
        let index = this.group.indexOf(this.diceMatch);
        if (index == 0) {
            this.multiplier = 1;
        }
        else {
            this.multiplier = Number.parseInt(this.group.slice(0, index));
            if (Number.isNaN(this.multiplier)) throw `multiplier ${this.group.slice(0, index)} is not valid`
        }
    }

    roll() {
        let outcome = {
            total: 0,
            rolls: [],
            label:"("
        };
        for (let i = 0; i < this.multiplier; i++) {
            let roll = DX.roll(this.diceMatch);
            outcome.rolls.push(roll);
            outcome.total += roll.value;
            outcome.label += `${roll.value}`;
            if(i !== this.multiplier-1) outcome.label += `+`;
        }
        outcome.label += `)`;
        return outcome;
    }

}