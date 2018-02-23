/******/ (function(modules) { // webpackBootstrap
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


var _quoteFetcher = __webpack_require__(1);

var c = new _quoteFetcher.QuoteFetcher('.init-buton');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QuoteFetcher = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = __webpack_require__(2);

var _promptBox = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuoteFetcher = exports.QuoteFetcher = function () {
    function QuoteFetcher(initButtonSelector) {
        _classCallCheck(this, QuoteFetcher);

        this._usedQuoteNums = [];
        this._citations = [];
        this._startButton = document.querySelector(initButtonSelector);
        this._citationsList = document.querySelector('.citations-list');
        this._citationsPromise = _http.http.get('https://talaikis.com/api/quotes/');
        this._rightPromptBox = new _promptBox.PromptBox('.propmpt-article--left');
        this._leftPromptBox = new _promptBox.PromptBox('.propmpt-article--right');

        this._startButton.addEventListener('click', this.init.bind(this));
    }

    _createClass(QuoteFetcher, [{
        key: 'init',
        value: function init() {
            var _this = this;

            this._citationsPromise.then(function (success) {
                _this._citations = success;
                _this._rightPromptBox.addClickListener(_this._onPromptClick.bind(_this));
                _this._leftPromptBox.addClickListener(_this._onPromptClick.bind(_this));
                _this._insertCitations();
            });
        }
    }, {
        key: '_insertCitations',
        value: function _insertCitations() {
            var len = this._citations.length,
                leftCitationNum = _generateRandom(len, this._usedQuoteNums),
                usedQuoteNums = this._usedQuoteNums.concat(leftCitationNum),
                rightCitationNum = _generateRandom(len, usedQuoteNums);

            this._rightPromptBox.addCitation(this._citations[rightCitationNum]);
            this._rightPromptBox.setQNum(rightCitationNum);
            this._leftPromptBox.addCitation(this._citations[leftCitationNum]);
            this._leftPromptBox.setQNum(leftCitationNum);
        }
    }, {
        key: '_onPromptClick',
        value: function _onPromptClick(promptBox) {
            this._storeChosen(promptBox);
            this._usedQuoteNums.push(promptBox.getQNum());
            if (this._citations.length <= this._usedQuoteNums.length) {
                window.reload(false);
            } else {
                this._insertCitations();
            }
        }
    }, {
        key: '_storeChosen',
        value: function _storeChosen(promptBox) {
            var li = document.createElement('li'),
                citation = promptBox.getCitation();
            li.append(citation.quoteBox, citation.authorBox);
            this._citationsList.appendChild(li);
        }
    }]);

    return QuoteFetcher;
}();

function _generateRandom(maxVal, lockedNums) {
    var result = void 0;
    do {
        result = Math.floor(Math.random() * maxVal);
    } while (lockedNums.indexOf(result) !== -1);
    return result;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Http = function () {
    function Http() {
        _classCallCheck(this, Http);
    }

    _createClass(Http, [{
        key: '_request',
        value: function _request(method, url) {
            return new Promise(function (success, error) {
                var xhr = new XMLHttpRequest();
                xhr.open(method, url, true);
                xhr.send();
                xhr.onerror = function (error) {
                    console.log(error);
                };
                xhr.onreadystatechange = function () {
                    if (this.readyState !== 4) {
                        return;
                    } else {
                        success(JSON.parse(this.responseText));
                    }
                };
            });
        }
    }, {
        key: 'get',
        value: function get(url) {
            return this._request('GET', url);
        }
    }, {
        key: 'post',
        value: function post(url) {
            return this._request('POST', url);
        }
    }]);

    return Http;
}();

var http = exports.http = new Http();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PromptBox = exports.PromptBox = function () {
    function PromptBox(selector) {
        _classCallCheck(this, PromptBox);

        this._container = document.querySelector(selector);
        this._citation = {};
        this._qNum = -1;
    }

    _createClass(PromptBox, [{
        key: 'clear',
        value: function clear() {
            this._container.innerHTML = "";
        }
    }, {
        key: 'addCitation',
        value: function addCitation(citation) {
            var quoteBox = document.createElement('q'),
                authorBox = document.createElement('cite');

            quoteBox.className = 'quotation';
            authorBox.className = 'author';
            quoteBox.innerHTML = citation.quote;
            authorBox.innerHTML = citation.author;

            this.clear();
            this._citation.quoteBox = quoteBox;
            this._citation.authorBox = authorBox;
            this._container.append(quoteBox, authorBox);
        }
    }, {
        key: 'getCitation',
        value: function getCitation() {
            return this._citation;
        }
    }, {
        key: 'setQNum',
        value: function setQNum(num) {
            this._qNum = num;
        }
    }, {
        key: 'getQNum',
        value: function getQNum() {
            return this._qNum;
        }
    }, {
        key: 'addClickListener',
        value: function addClickListener(listener) {
            var promptBox = this;
            this._container.addEventListener('click', function () {
                return listener(promptBox);
            });
        }
    }]);

    return PromptBox;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map