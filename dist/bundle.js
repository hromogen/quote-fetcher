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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quote_fetcher__ = __webpack_require__(1);


const c = new __WEBPACK_IMPORTED_MODULE_0__quote_fetcher__["a" /* QuoteFetcher */]('.init-buton');



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__http__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__prompt_box__ = __webpack_require__(3);



class QuoteFetcher {
    constructor(initButtonSelector){
        this._usedQuoteNums = [];
        this._citations = [];
        this._startButton = document.querySelector(initButtonSelector);
        this._citationsList = document.querySelector('.citations-list');
        this._citationsPromise = __WEBPACK_IMPORTED_MODULE_0__http__["a" /* http */].get('https://talaikis.com/api/quotes/');
        this._rightPromptBox = new __WEBPACK_IMPORTED_MODULE_1__prompt_box__["a" /* PromptBox */]('.propmpt-article--left');
        this._leftPromptBox = new __WEBPACK_IMPORTED_MODULE_1__prompt_box__["a" /* PromptBox */]('.propmpt-article--right');

        this._startButton.addEventListener('click', this.init);
    };
    init(){
        this._citationsPromise.then(
            success => {
                this._citations = success;
                rightPromptBox.addClickListener(this._onPromptClick);
                leftPromptBox.addClickListener(this._onPromptClick);
                this._insertCitations(rightPromptBox, leftPromptBox);
        });
    };
    _insertCitations(rightBox, leftBox){
        const leftCitationNum = _generateRandom(len, this._usedQuoteNums)
        ,rightCitationNum = _generateRandom(len, this._usedQuoteNums);

        rightBox.addCitation(this._citations[rightCitaionNum]);
        rightBox.setQNum(rightCitaionNum);
        leftBox.addCitation(this._citations[leftCitaionNum]);
        leftBox.setQNum(leftCitaionNum);
    };
    _onPromptClick(promptBox){
        _storeChosen(promptBox);
        this._usedQuoteNums.push(promptBox.getQNum());
        if(success.length >= this._usedQuoteNums.length){
            window.reload(false);
        }else{
            this._insertCitations(rightPromptBox
                , leftPromptBox
                , this._citations)
        }
    };
    _storeChosen(promptBox){
        const li = document.createElement('li')
        ,citation = promptBox.getCitation();
        li.append(citation.quoteBox, citation.authorBox);
        this._citationsList.appendChild(li);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = QuoteFetcher;



function _generateRandom(maxVal, lockedNums){
    let result;
    while(lockedNums.indexOf(result) == -1){
        result = Math.floor(Math.random()*maxVal);
    }
    return result;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Http {
    _request(method, url) {
        const promise = new Promise((success, error) => {
            const xhr = new XMLHttpRequest()
                ,url = this.url;

            xhr.open(method, url, true);
            xhr.send();
            xhr.onerror = function(error){
                console.log(error);
            };
            xhr.onreadystatechange = function() {
                if (this.readyState !== 4) {
                    return;
                } else {
                    success(JSON.parse(this.responseText));
                }
            }
        });
    };

    get(url) {
        return this._request('GET',url);
    };

    post(url) {
        return this._request('POST', url);
    };
}
const http = new Http()
/* harmony export (immutable) */ __webpack_exports__["a"] = http;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class PromptBox{
    constructor(selector){
        this._container = document.querySelector(sSelector);
        this._citation = {};
        this._qNum = -1;
    }
    clear(){
        this._container.innerHTML = "";
    }
    addCitation(citation){
        const quoteBox  = document.createElement('q')
        ,authorBox = document.createElement('cite');

        quoteBox.className = 'quotation';
        authorBox.className = 'author';
        quoteBox.innerHTML = citation.quote;
        authorBox.innerHTML = citation.author;

        this.clear();
        this._citation.quoteBox = quoteBox;
        this._citation.authorBox = authorBox;
        this._container.append(quoteBox, authorBox);
    }
    getCitation(){
        return this._citation; 
    }
    setQNum(num){
        this._qNum = num;
    }
    getQNum(){
        return this._qNum;
    }
    addClickListner(listener){
        const promptBox = this;
        this._container.addEventListener('click', () => listener(promptBox))
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PromptBox;


/***/ })
/******/ ]);