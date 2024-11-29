// ==UserScript==
// @name         Download Text Content
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Download text content of a webpage as a .txt file.
// @author       Your Name
// @match        https://metruyencv.com/truyen/*/*
// @match        https://www.pixiv.net/novel/show.php?id=*
// @grant        GM.xmlHttpRequest
// ==/UserScript==

(function() {
    'use strict';

    // Function to download the text content
    function downloadTextContent() {
        // Get the text content of the webpage
        var textContent = document.body.innerText;

        // Create a blob with the text content
        var blob = new Blob([textContent], { type: 'text/plain' });

        // Create a temporary link to download the file
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'yeu-nu-xin-dung-buoc-chuong-1.txt';
        link.style.display = 'none';

        // Add the link to the document
        document.body.appendChild(link);

        // Trigger the download when the button is clicked
        var button = document.createElement('button');
        button.textContent = 'Download Text';
        button.style.position = 'fixed';
        button.style.top = '20px';
        button.style.right = '20px';
        button.style.transform = 'translate(0, -50%)'; // Adjust the position to the top-right corner
        button.style.zIndex = '9999';
        button.addEventListener('click', function() {
            link.click();
        });

        // Add the button to the document
        document.body.appendChild(button);
    }

    // Wait for the page to finish loading
    window.addEventListener('load', function() {
        downloadTextContent();
    });
})();