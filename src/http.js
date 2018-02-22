'use strict';
export default class Http {
    constructor(url){
        this.url = url;
    }
    _request = function(method) {
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

    get() {
        return this._request('GET')
    };

    post() {
        return this._request('POST')
    };
}