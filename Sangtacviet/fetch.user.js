// ==UserScript==
// @name         Send Request Script
// @namespace    https://your-namespace.com
// @version      1.0
// @description  Script to send a request and get the response
// @match        https://sangtacviet.vip/truyen/idejian/1/12604193/1074/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var xhttp = new XMLHttpRequest();

    // Create the request payload
    var payload = {
        documentId: 'A111B79B1F308BF62F84DA2692851F2E',
        documentLifecycle: 'active',
        frameType: 'outermost_frame',
        initiator: 'https://sangtacviet.vip',
        method: 'POST',
        url: '',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'vi',
        'Content-type': 'application/x-www-form-urlencoded',
        'Origin': 'https://sangtacviet.vip',
        'Referer': 'https://sangtacviet.vip/truyen/idejian/1/12604193/1074/',
        'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
    };

    // Convert the payload to query string format
    var queryString = Object.keys(payload).map(function(key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]);
    }).join('&');

    // Handle the response
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            console.log('Response:', xhttp.responseText);
            // Do something with the response data
        }
    };

    // Send the request
    xhttp.open(payload.method, payload.url, true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(queryString);
})();