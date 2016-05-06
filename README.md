# DXJS
JS library for easy dice rolls

---

### Install
 To install either simply include or link dx.js

 *add example*

 This will add the expose DX to your project


*add example*

 ---

### Preconfigured dice

DXJS works by using dice objects. d2-d20 are created by default and can be accessed by:

```
DX.d5.roll();```

to view the last throw a dice has made you can use

```
DX.d5.value;```

If you need a higher dice then you can easily add a standard numerical die:

```
DX.addStandardDice(100);
DX.d100.roll();```

### Use custom dice
You can add your own dice to DX easily, simply name it and provide the face you want.

```
DX.addDice('decider',['yes','no']);
DX.addDice('mixed',['0','JS',{atk:4,def:1}]);

DX.decider.roll();
DX.mixed.roll();
```

or chain together for convenience:
```
DX.addDice('elements',['fire','wind','water','earth']).roll();
```

### Mixing dice and including functions
you can roll handfulls of dice easily using:

```
DX.roll('4d2 + 9d3 - 1d20');
```

N.B this function will (*try*) and create any dX dice it needs on the fly. If there is no d73 but you reference one then it should automaticaly add. This may not work if formatted strangely and will fail with anything but a DX dice.
