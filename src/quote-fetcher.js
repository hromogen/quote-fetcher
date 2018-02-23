import {http} from './http';
import {PromptBox} from './prompt-box';

export class QuoteFetcher {
    constructor(initButtonSelector){
        this._usedQuoteNums = [];
        this._citations = [];
        this._startButton = document.querySelector(initButtonSelector);
        this._citationsList = document.querySelector('.citations-list');
        this._citationsPromise = http.get('https://talaikis.com/api/quotes/');
        this._rightPromptBox = new PromptBox('.propmpt-article--left');
        this._leftPromptBox = new PromptBox('.propmpt-article--right');

        this._startButton.addEventListener('click', this.init.bind(this));
    };
    init(){
        this._citationsPromise.then(
            success => {
                this._citations = success;
                this._rightPromptBox.addClickListener(this._onPromptClick.bind(this));
                this._leftPromptBox.addClickListener(this._onPromptClick.bind(this));
                this._insertCitations();
        });
    };
    _insertCitations(){
        const len = this._citations.length
        ,leftCitationNum = _generateRandom(len, this._usedQuoteNums)
        ,usedQuoteNums = this._usedQuoteNums.concat(leftCitationNum)
        ,rightCitationNum = _generateRandom(len, usedQuoteNums);

        this._rightPromptBox.addCitation(this._citations[rightCitationNum]);
        this._rightPromptBox.setQNum(rightCitationNum);
        this._leftPromptBox.addCitation(this._citations[leftCitationNum]);
        this._leftPromptBox.setQNum(leftCitationNum);
    };
    _onPromptClick(promptBox){
        this._storeChosen(promptBox);
        this._usedQuoteNums.push(promptBox.getQNum());
        if(this._citations.length <= this._usedQuoteNums.length){
            window.reload(false);
        }else{
            this._insertCitations()
        }
    };
    _storeChosen(promptBox){
        const li = document.createElement('li')
        ,citation = promptBox.getCitation();
        li.append(citation.quoteBox, citation.authorBox);
        this._citationsList.appendChild(li);
    }
}


function _generateRandom(maxVal, lockedNums){
    let result;
    do{
        result = Math.floor(Math.random()*maxVal);
    }while(lockedNums.indexOf(result) !== -1);
    return result;
}