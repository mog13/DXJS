import DiceGroup from "./DiceGroup";

export default class Handfull {
    constructor(name, expression, config) {
        this.name = name;
        this.expression = expression;
        this.tokens = [];
        this.tokenizeExpression();
        this.config = config || {};
        this.history = [];
        if (!this.config.historyLimit) this.config.historyLimit = 100;
    }

    roll() {
        let rollTokens = this.tokens.slice();
        let outcome = {
            total: 0,
            label: "",
            input: this.expression,
            rolls: []
        };

        //roll the dice, build the label and populate the rolls
        rollTokens.forEach(token => {
            if (token.type === "dg") {
                token.roll = token.val.roll();
                outcome.label += `${token.roll.label }`;
                outcome.rolls.push(token.roll);
            }
            else {
                outcome.label += `${token.val }`;
            }
        });

        rollTokens = this.handleOpToken(rollTokens, "/");
        rollTokens = this.handleOpToken(rollTokens, "*");
        rollTokens = this.handleOpToken(rollTokens, "-");
        rollTokens = this.handleOpToken(rollTokens, "+");
        outcome.total = rollTokens.reduce((accumulator, token) => {
            return accumulator + this.getTokenValue(token);
        }, 0);

        this.history = [outcome].concat(this.history);
        if (this.history.length > this.config.historyLimit) this.history.pop();

        return outcome;
    };

    getTokenValue(token) {
        if (token.type === "dg") return token.roll.total;
        return token.val;
    }

    handleOpToken(rollTokens, op) {
        for (let i = 0; i < rollTokens.length; i++) {
            if (rollTokens[i].val === op) {
                rollTokens[i] = {
                    type: "calc",
                    val: this.handleOp(this.getTokenValue(rollTokens[i - 1]), this.getTokenValue(rollTokens[i + 1]), op)
                };
                rollTokens.splice(i + 1, 1);
                rollTokens.splice(i - 1, 1);
                i -= 2;
            }
        }
        return rollTokens;
    }

    handleOp(a, b, op) {
        if (op === "/") return a / b;
        if (op === "*") return a * b;
        if (op === "-") return a - b;
        return a + b;
    }

    tokenizeExpression() {
        const tokenSeparator = /([+\-*/])/g;
        let tempTokens = this.expression.split(tokenSeparator);
        tempTokens.forEach((token) => {
            if (tokenSeparator.test(token)) {
                this.tokens.push({type: "op", val: token});
            }
            else {
                this.tokens.push({type: "dg", val: new DiceGroup(token)})
            }
        });
    }


}