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
  console.log('trying to create dice: ',candidate);
  if(/[^1-9]{0}d[1-9]+/.test(candidate)){
      var newDice = /[^1-9]{0}d[1-9]+/.exec(candidate)[0];
      var temp = parseInt(newDice.replace(/[a-z A-Z]/g,''));
      var faces = [];
      for(var n = 1; n <= temp; n++){
        faces.push(n);
      }
      this[newDice] = new dice(candidate,faces);
  }
  else{
    throw('no such dice: ' +candidate)
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
      this._tryToParseDice(die);
      //@todo need better catching here!
    }
  var value = 0;
    for(var i =0; i <repeater;i++){
      var roll = this[die].roll();
      rolls.push({'value':roll,'throw':die});
      value += roll;
    }

  }

  var overview = rolls.reduce(function(previousValue, currentValue, currentIndex, array) {
  var retVal =  previousValue;
  if(currentIndex != 0) retVal += '  ';
  return retVal + currentValue.value;
},'');

  return {
    'value':value,
    'throw':rollFunc,
    'rolls':rolls,
    'overview':overview
  };
};

dx.prototype.roll = function(rollFunc) {

  //spiit dice roll by operators
  var parts = rollFunc.split(/([\+\-\/\*])/);
  var rolls = [];
  //for each one evaluate it as a single roll
  var op = undefined;
  var value = undefined;
  var overview = '';
  var that = this;
  parts.forEach(function(roll){
  switch(roll) {
    case '+':
    case '-':
    case '/':
    case '*':
      op = roll;
      break;
    default:
      var rollResult = that._evaluateSingleRoll(roll.trim())
      rolls.push(rollResult);
      if(value === undefined) {
        if(isNaN(parseInt(rollResult.value))) value = '';
        else value = 0;
      }
      if(op === '+' | op === undefined) value += rollResult.value;
      else if(op === '-') value -= rollResult.value;
      else if(op === '*') value *= rollResult.value;
      else if(op === '/') value /= rollResult.value;

      if(op!= undefined) overview += ' ' + op + ' ';
      overview += '('+ rollResult.overview +') ';

  }

});
  return {
    'value':value,
    'throw':rollFunc,
    'rolls':rolls,
    'overview':overview
    };
};



DX = new dx();


///for splitting:([0-9]*d[0-9]*
