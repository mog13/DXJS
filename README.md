# DXJS
[![Build Status](https://travis-ci.org/mog13/DXJS.svg?branch=master)](https://travis-ci.org/mog13/DXJS)
(docs are a work in progress)

*TL;DR DX.roll("5d2 + 2StrengthDice - armourDice)*

DXJS is a dice library that's simple to use and customize, allowing rich information and unconventional dice.

With DXJS you can:
 - Make simple dice rolls
 - Easily get output of complicated dice rolls e.g.(3d8*2d4+4mycusomDice)
 - Track the history of your dice
 - Add events on dice roll
 - Reuse dice and save preconfigurations or dice groups
 
By default, dice from d2 (a coin) to d100 (100 sided dice) are initialised, but DXJS allows
you to easily create custom dice containing anything you wish.

  *A note on dice namin conventions*

  *by default DXJS's default dice use the d20 format. for instance 
  a d10 is a dice with 10 faces (1-10). 2d10 would be 2 10 sided dice.*  

  *You are of course free to adopt any naming convention you wish*

## Dice

A dice has a few important parameters: a name, faces, and config.

- **name** - The name of the dice and how it will be referenced in DXJS 
- **faces** The list of faces 
    - Each Face has a value of the face e.g. 1
    - Each Face has a label e.g. "one"
    - Each Face has a data object which is JSON where you can store anything e.g an image
    

All extra parameters belong in the config:

- **onLand** - The function to run when the dice is rolled.
- **historyLimit** - The amount of rolls to maintain in a memory.


### Output

To be documented.

### addDice(name, faces, config)
Adds a dice to DXJS

- **name** - The name of the dice (used to roll it).
- **faces** - The faces of the dice. 
  - This can be an array of values `[1,2,3]` in which case the labels will be generated from the values.
  - Or it can be an array of Dice faces `[{value:"sun", label:"Sun"}]`.
- **config** - A config object for the dice (see above) (can be empty).
### addHandful(name, expression, config)
Adds a collection of dice to DXJS

- **name** - The name of the handfull (used to roll it).
- **expession** - What the handfull is made of (can contain dice and basic operators) e.g. `2d6 +3d8 -exampleDice *4d6`.
- **config** - A config object for extra data, can be empty.
### roll(rollTarget)
Rolls the given target. The target can be:

 - **Dice** - `roll("d2")`.
 - **Handfull** - `roll("MorgansATKDice")`.
 - **Array** - `roll([1,2,3,4])`
 - **Expression** - `roll("d4 + 3d8)`.
 - **Inline Dice** - `roll({name:"example",faces:[1,2,3],config@{}})`

## Installation

You can install DX.js by 
- copying the file into your workspace.
- NPM publication is in the works.

You can then import it in the project via
- a script tag: `<script src="./link_to_DXJS.js"/>`
- require: `require("DXJS")`
- import: `import DX from "DXJS"`

## Developing

Pull requests welcome (with relevant tests).

`npm install` to install

`npm build` to bundle with webpack.

Feel free to raise bugs/issues. Issues containing supporting code or tests to prove the bug would be very appreciated.

## Testing

Testing is done via Jest and Jasmine. Tests can be run with `npm test` or simply `jest`.
