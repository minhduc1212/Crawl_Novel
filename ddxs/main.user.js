// ==UserScript==
// @name         ddxs crawler
// @version      1.0
// @description  Crawls web content and saves it to a file
// @match        https://www.ddxs.com/wojuranrendeshanggushenwen1/
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
  'use strict';

  const baseUrl = 'https://www.ddxs.com/wojuranrendeshanggushenwen1/';
  let content = '';

  function logDoneUrl(url) {
    console.log(`Done fetching: ${url}`);
  }

  function fetchPageContent(pageNumber) {
    return new Promise((resolve, reject) => {
      const url = `${baseUrl}${pageNumber}.html`;
      GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function(response) {
          const parser = new DOMParser();
          const htmlDoc = parser.parseFromString(response.responseText, 'text/html');
          const area = htmlDoc.querySelector('.bdsub');

          if (area) {
            const chapName = area.querySelector('h1').textContent;
            content += `${chapName}\n`;

            const lines = area.querySelectorAll('p');
            lines.forEach(line => {
              content += `${line.textContent}\n`;
            });
          }

          if (pageNumber === 2444) {
            saveContentToFile();
          }
          logDoneUrl(url);
          resolve();
        },
        onerror: function(error) {
          console.log('Error:', error);
          reject(error);
        }
      });
    });
  }

  function saveContentToFile() {
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'content.txt';
    link.click();
  }

  async function startCrawling() {
    for (let i = 1; i <= 2444; i++) {
      await fetchPageContent(i);
    }
  }

  startCrawling();
})();