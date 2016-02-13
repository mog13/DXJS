/**
 * Created by morganowen on 13/02/16.
 */

var Utilities = function(){

    this.evaluateRoll = function(rollFunc){
        var amount = rollFunc.split('d')[0];
        var diceSize = rollFunc.split('d')[1];
        var values = [];
        var total = 0;
        for(var i =0; i <amount; i++){
            values.push(this.roll(diceSize));
            total += values[values.length-1];
        }
       return {'values':values,'total':total};
    };

    this.roll = function(amount){
      return  Math.floor((Math.random() * amount) + 1)
    };
};