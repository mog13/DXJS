
function dice(name,faces){
  this.name = name ||'unamed dice';
  this.value = undefined;
  this.faces = faces || [];

}

dice.prototype.roll = function() {
var face = Math.floor((Math.random() * this.faces.length));
this.value = this.faces[face];
return this.value;
}

dice.prototype.handfull = function(amount) {
  var value = 0;
  var rolls = [];
    for(var i =0; i <amount;i++){
      var roll = this.roll();
      rolls.push({'value':roll,'throw':this.name});
      value += roll;
    }
    var overview = rolls.reduce(function(previousValue, currentValue, currentIndex, array) {
    var retVal =  previousValue;
    if(currentIndex != 0) retVal += '  ';
    return retVal + currentValue.value;
  },'');
    return {
      'value':value,
      'throw':amount+this.name,
      'rolls':rolls,
      'overview':overview
    }
}
