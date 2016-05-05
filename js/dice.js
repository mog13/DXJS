
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
