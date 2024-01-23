// ==UserScript==
// @name         Extract Text from Web Page
// @namespace    https://www.example.com
// @version      1.0
// @description  Extracts text from a web page
// @match        https://www.uuks.org/b/32987/412331.html
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Make the HTTP request to the web page
    fetch('https://www.uuks.org/b/32987/412331.html')
        .then(response => response.text())
        .then(html => {
            // Parse the HTML response
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extract the desired text from the web page
            const text = doc.querySelector('body').innerText;

            // Do something with the extracted text
            console.log(text);
        })
        .catch(error => {
            console.error('Error:', error);
        });
})();