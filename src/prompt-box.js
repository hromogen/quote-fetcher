'use strict';
export default class CitationImplementer{
    constructor(
        promptBoxSelector
        ,citation
    ){
        this.promptBox = document.querySelector(promptBoxSelector);
        this.quoteList = document.querySelector('.citations-list');
        this.quoteBox = document.createElement('span');
        this.authorBox = document.createElement('span');

        this.quoteBox.innerHTML = citation.quote;
        this.authorBox.innerHTML = citation.author;




    }
}
function generateRandom(maxVal, lockedNums){
    let result;
    while(lockedNums.indexOf(result) == -1){
        result = Math.floor(Math.random()*maxVal);
    }
    return result;
}