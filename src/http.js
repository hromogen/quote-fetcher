'use strict';
class Http {
    _request(method, url) {
        return new Promise((success, error) => {
            const xhr = new XMLHttpRequest();
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
export const http = new Http()