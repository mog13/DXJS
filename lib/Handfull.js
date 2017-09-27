import DX from "./dx";

export default class Handfull{
    constructor(name,expression,config) {
        this.name = name;
        this.expression =expression;
        this.tokenizeExpression();
        this.config = config || {};
    }

    roll(){
        return DX.roll("D2");
    };

    tokenizeExpression() {
        this.tokens = this.expression.split(/([+\-*/])/g);
    }

    findDiceInToken() {

    }

}