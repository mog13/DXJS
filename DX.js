(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("DX", [], factory);
	else if(typeof exports === 'object')
		exports["DX"] = factory();
	else
		root["DX"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _DX = __webpack_require__(1);

var _DX2 = _interopRequireDefault(_DX);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _DX2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Dice = __webpack_require__(2);

var _Dice2 = _interopRequireDefault(_Dice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DX = function () {
    function DX() {
        _classCallCheck(this, DX);

        this.dice = {};
        this.addDice("D2", [1, 2]);
    }

    _createClass(DX, [{
        key: "addDice",
        value: function addDice(name, faces, historyLimit, onLand) {
            if (this.dice[name]) {
                throw "A dice with the name " + name + " already exists";
            } else {
                return this.dice[name] = new _Dice2.default(name, faces, historyLimit, onLand);
            }
        }
        //this can be a single dice/array/new dice object

    }, {
        key: "roll",
        value: function roll(dice) {
            if (typeof dice === "string") {
                if (this.dice[dice]) {
                    return this.dice[dice].roll();
                } else {
                    //execute the roll command
                    return -1;
                }
            } else {
                if (Array.isArray(dice)) {
                    return dice[Math.floor(Math.random() * dice.length)];
                } else {
                    if (dice instanceof _Dice2.default) {
                        return dice.roll();
                    } else {
                        return this.addDice(dice.name, dice.faces, dice.historyLimit, dice.onLand).roll();
                    }
                }
            }
        }
    }]);

    return DX;
}();

exports.default = new DX();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DiceFace = __webpack_require__(3);

var _DiceFace2 = _interopRequireDefault(_DiceFace);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dice = function () {
    function Dice(name, faces, config) {
        var _this = this;

        _classCallCheck(this, Dice);

        this.name = name;
        this.history = [];
        this.config = config || {};
        if (!this.config.historyLimit) this.config.historyLimit = 100;
        this.faces = [];
        var tempFaces = [].concat(faces);
        tempFaces.forEach(function (face) {
            _this.faces.push(new _DiceFace2.default(face));
        });
    }

    _createClass(Dice, [{
        key: "roll",
        value: function roll() {
            var outcome = this.faces[Math.floor(Math.random() * this.faces.length)];
            this.history = [outcome].concat(this.history);
            if (this.history.length > this.config.historyLimit) this.history.pop();
            if (this.config.onLand) {
                this.config.onLand(outcome);
            }
            return outcome;
        }
    }]);

    return Dice;
}();

exports.default = Dice;
;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DiceFace = function DiceFace(face) {
    _classCallCheck(this, DiceFace);

    if ((typeof face === "undefined" ? "undefined" : _typeof(face)) === "object") {
        this.value = face.value || face.val;
        this.label = face.label || face.value;
        this.data = face.data || {};
    } else {
        this.value = face;
        this.label = face;
        this.data = {};
    }
};

exports.default = DiceFace;
;

/***/ })
/******/ ]);
});