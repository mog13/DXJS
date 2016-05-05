var DX = require('');

DX.d3.roll();
DX.d6.roll();
DX.d20.roll();

DX.roll('4d10');
DX.roll('d4+2d8');
DX.roll('3s2-(d4+2d8)');

DX.createDice('elements',['fire','wind','water','earth']);
DX.elements.roll();

//the initial d3 etc use create dice internally -> createDice('d4',[1,2,3,4]);
// loop to create d2-d20

DX.showDice();

DX.showLog();
DX.logBuffer = 100;

var exampleDiceOutput = {
  value:5,
  throw:'2d3',
  rolls:[
    {value:2,
    throw:'d3'
    rolls:[]},
    {value:3,
    throw:'d3'
    rolls:[]},
  ],
  toString:function(){
    return 'rolled ' + thorw + ' -> ' + value;
  }
}
