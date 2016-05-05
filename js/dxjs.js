/**
 * Created by morganowen on 13/02/16.
 */
//require('./dice.js');
 var dx = function (){
    for(var i= 2; i <=20 ;i++){
      var faces = [];
      for(var n = 1; n <=i;n++){
        faces.push(n);
      }
      this['d'+i] = new dice('d'+i,faces);
    }
};

dx.prototype.showDice = function(){
  var storedDice = [];
  for (var key in this) {
    if (this[key] instanceof dice) {
      storedDice.push(this[key]);
    }
  }
  return storedDice;
}

dx.prototype._tryToParseDice = function(candidate){
  if(/[^1-9]{0}d[1-9]+/.test(candidate)){
      var newDice = /[^1-9]{0}d[1-9]+/.exec(candidate);
      var temp = parseInt(newDice.replace(/[a-z A-Z]/g,''));
      var faces = [];
      for(var n = 1; n <= temp; n++){
        face.push(n);
      }
      this[newDice] = new dice(candidate,faces);
  }
  else{
    throw('no such dice: ' +rollFunc)
  }
};

dx.prototype._evaluateSingleRoll = function(rollFunc) {
  var rolls = [];
var index = /[a-z]/.exec(rollFunc).index;
var repeater = 1;
if(index > 0) repeater = parseInt(rollFunc.substring(0,index));
if(index >=0){
  var die = rollFunc.substring(index);
  //if it doesnt exist try and make one (in form of dX)
  if(this[die] === undefined){
    this._tryToParseDice();
    //@todo need better catching here!
  }
var value = 0;
  for(var i =0; i <repeater;i++){
    var roll = this[die].roll();
    rolls.push({'value':roll,'throw':die});
    value += roll;
  }

}

return {
  'value':value,
  'throw':rollFunc,
  'rolls':rolls
};
};


dx.prototype.evaluateRoll = function(rollFunc) {
  var funcOut =  {};

}

DX = new dx();


///for splitting:([0-9]*d[0-9]*
