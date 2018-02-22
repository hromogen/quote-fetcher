import {Http} from './http-getter';
import {CitationImplementer} from './citation-handler';
import {generateRandom} from './generate-random';

new Http('https://talaikis.com/api/quotes/').get().then(
    success => {
        const len = success.length
            ,leftCitaionNum = generateRandom(len);


})

