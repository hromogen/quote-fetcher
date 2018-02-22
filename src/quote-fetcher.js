import {http} from './http-getter';
import {PromptBox} from './citation-handler';

class QuoteFetcher {
    constructor(startButtonSelector){
        this._usedQuoteNums = [];
        this._citations = [];
        this._startButton = document.querySelector(startButtonSelector);
        this._citationsList = document.querySelector('.citations-list');
        this._citationsPromise = http.get('https://talaikis.com/api/quotes/');
        this._rightPromptBox = new PromptBox('.propmpt-article--left');
        this._leftPromptBox = new PromptBox('.propmpt-article--right');

        this._startButton.addEventListener('click', this.init);
    }
    init(){
        this._citationsPromise.then(
            success => {
                this._citations = success;
                rightPromptBox.addClickListener(this._onPromptClick);
                leftPromptBox.addClickListener(this._onPromptClick);
                this._insertCitations(rightPromptBox, leftPromptBox);
        });
    }
    _insertCitations(rightBox, leftBox){
        const leftCitationNum = _generateRandom(len, this._usedQuoteNums)
        ,rightCitationNum = _generateRandom(len, this._usedQuoteNums);

        rightBox.addCitation(this._citations[rightCitaionNum]);
        rightBox.setQNum(rightCitaionNum);
        leftBox.addCitation(this._citations[leftCitaionNum]);
        leftBox.setQNum(leftCitaionNum);
    }
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
    }
    _storeChosen(promptBox){
        const li = document.createElement('li')
        ,citation = promptBox.getCitation();
        li.append(citation.quoteBox, citation.authorBox);
        this._citationsList.appendChild(li);
    }
}


function _generateRandom(maxVal, lockedNums){
    let result;
    while(lockedNums.indexOf(result) == -1){
        result = Math.floor(Math.random()*maxVal);
    }
    return result;
}