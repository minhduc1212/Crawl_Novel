// ==UserScript==
// @name         STV DLD
// @namespace    https://your-namespace.com
// @version      1.2
// @description  Script to send a request and get the response without causing page refresh issues, prevents tab discarding.
// @match        https://sangtacviet.vip/truyen/fanqie/*/*/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Ensure the script runs only on chapter pages
    if (!window.location.pathname.includes('/truyen/fanqie/')) {
        return;
    }

    var runButton = document.createElement('button');
    runButton.innerText = 'Download Chapters';
    runButton.style.position = 'fixed';
    runButton.style.top = '50%';
    runButton.style.right = '10px';
    runButton.style.transform = 'translateY(-50%)';
    runButton.style.padding = '10px 15px';
    runButton.style.backgroundColor = '#4CAF50';
    runButton.style.color = 'white';
    runButton.style.border = 'none';
    runButton.style.borderRadius = '5px';
    runButton.style.cursor = 'pointer';
    runButton.style.zIndex = '9999'; // Ensure button is on top
    runButton.style.opacity = '0.9';

    // Add hover effect
    runButton.onmouseover = function() {
        this.style.opacity = '1';
    };
    runButton.onmouseout = function() {
        this.style.opacity = '0.9';
    };

    var statusDiv = document.createElement('div');
    statusDiv.style.position = 'fixed';
    statusDiv.style.bottom = '10px';
    statusDiv.style.left = '10px';
    statusDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
    statusDiv.style.color = 'white';
    statusDiv.style.padding = '10px';
    statusDiv.style.borderRadius = '5px';
    statusDiv.style.zIndex = '9999';
    statusDiv.style.display = 'none'; // Hidden by default
    document.body.appendChild(statusDiv);

   
    function keepTabActive() {
        var audio = new Audio();
        // Use a 1-second silent WAV (universally supported)
        audio.src = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
        audio.loop = true; // Loop indefinitely
        audio.play().catch(function(error) {
            console.error('Error playing silent audio:', error);
        });
    }
    // Call the function to keep the tab active

    runButton.onclick = async function() {
        runButton.disabled = true;
        runButton.innerText = 'Initializing...';
        statusDiv.innerText = 'Starting download...';
        statusDiv.style.display = 'block';

        // Start the silent audio loop when download begins
        keepTabActive();

        // --- IMPORTANT: Replace with your actual URLs if they are not dynamically generated ---
        // For demonstration, I'm using the two provided.
        // In a real scenario, you'd likely fetch a list of chapters from the current page
        // or a predefined list for the book.
        var urls_to_fetch = [
                "https://sangtacviet.vip/truyen/fanqie/1/7303349871199652883/7473143233422311960/",
                "https://sangtacviet.vip/truyen/fanqie/1/7303349871199652883/7508004417325515289/",
                "https://sangtacviet.vip/truyen/fanqie/1/7303349871199652883/7508402603101798937/",
                "https://sangtacviet.vip/truyen/fanqie/1/7303349871199652883/7508402914994422297/",
                "https://sangtacviet.vip/truyen/fanqie/1/7303349871199652883/7508759937099498009/"
            // Add more chapter URLs here as needed
        ];
        // ----------------------------------------------------------------------------------

        var responses = [];
        var failedUrls = [];
        var totalUrls = urls_to_fetch.length;

        function updateStatus(message) {
            statusDiv.innerText = message;
        }

        function sendRequest(url, index) {
            return new Promise((resolve, reject) => {
                var parts = url.split('/');
                var chapterId = parts[parts.length - 2]; // Get the chapter ID (e.g., 7303349912383521321)

                // The actual endpoint for the POST request
                const requestUrl = 'https://sangtacviet.vip/index.php';

                // Parameters to be sent in the POST body (form-urlencoded)
                const postData = new URLSearchParams({
                    bookid: '7303349871199652883', // This seems constant for the book
                    h: 'fanqie',
                    c: chapterId,
                    ngmar: 'readc',
                    sajax: 'readchapter',
                    sty: '1',
                    exts: ''
                }).toString();

                var xhttp = new XMLHttpRequest();

                // Define headers
                const headers = {
                    'Accept': '*/*',
                    'Accept-Encoding': 'gzip, deflate, br, zstd',
                    'Accept-Language': 'vi',
                    'Content-type': 'application/x-www-form-urlencoded', // Crucial for POST data
                    'Origin': 'https://sangtacviet.vip',
                    'Referer': url, // Referer should be the chapter page URL
                    'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
                };

                var successIndicator = '"code":"0"'; // Server response indicating success

                xhttp.onreadystatechange = function() {
                    if (xhttp.readyState === 4) {
                        if (xhttp.status === 200 && xhttp.responseText.includes(successIndicator)) {
                            console.log(`[${index + 1}/${totalUrls}] Successfully fetched: ${url}`);
                            responses.push(xhttp.responseText);
                            resolve(xhttp.responseText);
                        } else {
                            console.error(`[${index + 1}/${totalUrls}] Failed to fetch ${url}. Status: ${xhttp.status}. Response: ${xhttp.responseText.substring(0, 200)}...`);
                            failedUrls.push(url);
                            reject(new Error(`Request failed for ${url} with status ${xhttp.status}`));
                        }
                    }
                };

                xhttp.open('POST', requestUrl, true);
                xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhttp.send(postData); // Send the form-urlencoded data as the POST body
            });
        }

        function saveResponses() {
            if (responses.length === 0) {
                console.log("No responses to save.");
                return;
            }
            var combinedResponse = responses.join('\n\n'); // Combine all responses with a double newline for readability
            var blob = new Blob([combinedResponse], { type: "text/plain" });
            var url_txt = window.URL.createObjectURL(blob);

            var link = document.createElement("a");
            link.href = url_txt;
            link.download = "combined_responses.txt";
            document.body.appendChild(link); // Append to body to make it clickable
            link.click();
            document.body.removeChild(link); // Clean up
            window.URL.revokeObjectURL(url_txt);
            console.log("Combined responses saved to combined_responses.txt");
        }

        function saveFailedUrls() {
            if (failedUrls.length === 0) {
                console.log("No failed URLs.");
                return;
            }
            var combinedFailedUrls = failedUrls.join('\n');

            var blob = new Blob([combinedFailedUrls], { type: "text/plain;charset=utf-8" });
            var url_txt = window.URL.createObjectURL(blob);

            var link = document.createElement("a");
            link.href = url_txt;
            link.download = "failed_urls.txt";
            document.body.appendChild(link); // Append to body to make it clickable
            link.click();
            document.body.removeChild(link); // Clean up
            window.URL.revokeObjectURL(url_txt);
            console.log("Failed URLs saved to failed_urls.txt");
        }

        // Send the requests one by one
        for (var i = 0; i < totalUrls; i++) {
            updateStatus(`Downloading chapter ${i + 1} of ${totalUrls}...`);
            try {
                await sendRequest(urls_to_fetch[i], i);
                // Wait for 1.5 seconds before the next request to avoid overwhelming the server
                await new Promise(resolve => setTimeout(resolve, 10000));
            } catch (error) {
                console.error(`Overall error for URL ${urls_to_fetch[i]}:`, error);
                // Optionally, add a longer delay after a failed request before retrying or moving on
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        }

        updateStatus('All requests completed. Saving files...');

        // Save the responses after all requests are done
        saveResponses();

        // Save the failed URLs after all requests are done
        saveFailedUrls();

        // Change the button state and text
        runButton.disabled = false;
        runButton.innerText = 'Download Complete!';
        updateStatus('Download complete!');
        setTimeout(() => {
            statusDiv.style.display = 'none'; // Hide status after a few seconds
        }, 5000);
    };

    // Add the button to the webpage
    document.body.appendChild(runButton);
    
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        e.returnValue = 'Bạn có chắc chắn muốn rời khỏi trang? Quá trình tải có thể bị mất.';
    });
})();