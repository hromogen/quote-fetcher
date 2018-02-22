'use strict';
export class PromptBox{
    constructor(selector){
        this._container = document.querySelector(selector);
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