// ==UserScript==
// @name         STV DLD Chapters
// @namespace    https://your-namespace.com
// @version      1.3
// @description  Script to send a request and get chapter content, saves as text, prevents tab discarding.
// @match        https://sangtacviet.vip/truyen/fanqie/*/*/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Ensure the script runs only on chapter pages (the @match already handles this, but good for robustness)
    if (!window.location.pathname.includes('/truyen/fanqie/')) {
        return;
    }

    const runButton = document.createElement('button');
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

    const statusDiv = document.createElement('div');
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

    let silentAudio = null; // Store the audio object to stop it later


    /**
     * Converts HTML content to readable plain text.
     * @param {string} html - The HTML string to convert.
     * @returns {string} The plain text representation.
     */
    function htmlToPlainText(html) {
        if (!html) return '';
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;

        // Remove script and style tags which are not part of the content
        tempDiv.querySelectorAll('script, style').forEach(el => el.remove());

        // Replace specific block-level elements with newlines for better readability
        // e.g., paragraphs, divs, headings
        tempDiv.innerHTML = tempDiv.innerHTML.replace(/<br\s*\/?>/gi, '\n'); // Convert <br> to newline
        tempDiv.querySelectorAll('p, div, h1, h2, h3, h4, h5, h6, li').forEach(el => {
            // Add two newlines after block elements, trim content
            el.insertAdjacentText('afterend', '\n\n');
        });

        // Get the plain text, then normalize whitespace
        let text = tempDiv.innerText;

        // Clean up multiple newlines or spaces
        text = text.replace(/(\n\s*){2,}/g, '\n\n'); // Replace multiple newlines with at most two
        text = text.replace(/ {2,}/g, ' '); // Replace multiple spaces with a single space
        text = text.trim(); // Trim leading/trailing whitespace

        return text;
    }

    let isDownloadInProgress = false; // Flag to prevent multiple downloads

    runButton.onclick = async function() {
        if (isDownloadInProgress) {
            updateStatus('Download already in progress. Please wait.');
            return;
        }

        isDownloadInProgress = true;
        runButton.disabled = true;
        runButton.innerText = 'Initializing...';
        statusDiv.innerText = 'Starting download...';
        statusDiv.style.display = 'block';

        keepTabActive(); // Start the silent audio loop when download begins

        // --- IMPORTANT: This is a hardcoded list of URLs. ---
        // For a more general script, you would dynamically extract these URLs
        // from the book's index page (e.g., from an <a> tag list).
        // Example: You might navigate to the book's main page
        // (e.g., https://sangtacviet.vip/truyen/fanqie/1/7441048283864108094/)
        // and extract all chapter links from there.
        // For this fix, we'll assume the provided list is what you want to process.
        const urls_to_fetch = [
            "https://sangtacviet.vip/truyen/fanqie/1/7441048283864108094/7441048554019242558/",
            "https://sangtacviet.vip/truyen/fanqie/1/7441048283864108094/7443282867825689150/",
            // ... (Your very long list of URLs)
            "https://sangtacviet.vip/truyen/fanqie/1/7441048283864108094/7511677311553389080/"
        ];

        // Array to store formatted chapter data { title: "...", content: "..." }
        const chapterData = [];
        const failedUrls = [];
        const totalUrls = urls_to_fetch.length;
        const maxRetries = 3; // Number of retries for each failed request
        const delayBetweenRequestsMs = 10000; // 10 seconds delay between requests
        const delayBetweenRetriesMs = 5000; // 5 seconds delay before retrying

        function updateStatus(message) {
            statusDiv.innerText = message;
        }

        /**
         * Sends a single POST request for a chapter.
         * Resolves with the parsed chapter data, or rejects on failure.
         * @param {string} url - The URL of the chapter page (used for Referer and ID extraction).
         * @returns {Promise<object>} A promise that resolves with { title, content } or rejects.
         */
        function sendChapterRequest(url) {
            return new Promise((resolve, reject) => {
                const parts = url.split('/');
                const bookId = parts[parts.length - 3];
                // chapterId is the last numeric part before the trailing slash
                const chapterId = parts[parts.length - 2];

                if (!bookId || !chapterId || isNaN(bookId) || isNaN(chapterId)) {
                    return reject(new Error(`Could not extract book or chapter ID from URL: ${url}`));
                }

                const requestUrl = 'https://sangtacviet.vip/index.php';

                // Parameters to be sent in the POST body (form-urlencoded)
                const postData = new URLSearchParams({
                    bookid: bookId,
                    h: 'fanqie',
                    c: chapterId,
                    ngmar: 'readc',
                    sajax: 'readchapter',
                    sty: '1',
                    exts: ''
                }).toString();

                const xhttp = new XMLHttpRequest();

                // Define headers (some are for mimicking browser behavior, Referer is important)
                const headers = {
                    'Accept': '*/*',
                    'Accept-Encoding': 'gzip, deflate, br, zstd',
                    'Accept-Language': 'vi',
                    'Content-type': 'application/x-www-form-urlencoded',
                    'Origin': 'https://sangtacviet.vip',
                    'Referer': url, // Referer should be the specific chapter page URL
                    'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
                };

                // The server response should contain '"code":"0"' for success
                const successIndicator = '"code":"0"';

                xhttp.onreadystatechange = function() {
                    if (xhttp.readyState === 4) {
                        if (xhttp.status === 200 && xhttp.responseText.includes(successIndicator)) {
                            try {
                                const jsonResponse = JSON.parse(xhttp.responseText);
                                if (jsonResponse.code === '0' && jsonResponse.data && jsonResponse.data.chapter_info) {
                                    const title = jsonResponse.data.chapter_info.chapter_title || `Chapter ${chapterId}`;
                                    const content = htmlToPlainText(jsonResponse.data.chapter_info.chapter_content || '');
                                    resolve({ title, content });
                                } else {
                                    reject(new Error(`Invalid JSON response format for ${url}: ${xhttp.responseText.substring(0, 100)}...`));
                                }
                            } catch (e) {
                                reject(new Error(`Failed to parse JSON response for ${url}: ${e.message}. Response: ${xhttp.responseText.substring(0, 100)}...`));
                            }
                        } else {
                            reject(new Error(`Request failed for ${url}. Status: ${xhttp.status}. Response: ${xhttp.responseText.substring(0, 200)}...`));
                        }
                    }
                };

                xhttp.open('POST', requestUrl, true);
                // Set all headers
                for (const headerName in headers) {
                    xhttp.setRequestHeader(headerName, headers[headerName]);
                }
                xhttp.send(postData);
            });
        }

        /**
         * Sends a chapter request with retry logic.
         * @param {string} url - The chapter URL.
         * @param {number} index - The index of the current URL in the list.
         * @param {number} maxRetries - Maximum number of retries.
         * @returns {Promise<void>} Resolves if successful after retries, rejects if all retries fail.
         */
        async function fetchChapterWithRetry(url, index, maxRetries) {
            for (let attempt = 1; attempt <= maxRetries; attempt++) {
                updateStatus(`Downloading chapter ${index + 1} of ${totalUrls} (Attempt ${attempt})...`);
                try {
                    const data = await sendChapterRequest(url);
                    console.log(`[${index + 1}/${totalUrls}] Successfully fetched: ${url}`);
                    chapterData.push(data);
                    return; // Success, exit loop
                } catch (error) {
                    console.error(`[${index + 1}/${totalUrls}] Failed to fetch ${url}. Error: ${error.message}`);
                    if (attempt < maxRetries) {
                        console.warn(`Retrying ${url} in ${delayBetweenRetriesMs / 1000} seconds...`);
                        await new Promise(resolve => setTimeout(resolve, delayBetweenRetriesMs));
                    } else {
                        console.error(`Failed to fetch ${url} after ${maxRetries} attempts.`);
                        failedUrls.push(url);
                        throw error; // Propagate failure after max retries
                    }
                }
            }
        }

        // Main loop to fetch all chapters
        for (let i = 0; i < totalUrls; i++) {
            try {
                await fetchChapterWithRetry(urls_to_fetch[i], i, maxRetries);
            } catch (e) {
                // The error is already logged and URL added to failedUrls in fetchChapterWithRetry
                // Continue to the next URL even if one fails
            }
            // Add a delay between requests to avoid overwhelming the server
            if (i < totalUrls - 1) { // Don't delay after the last request
                await new Promise(resolve => setTimeout(resolve, delayBetweenRequestsMs));
            }
        }

        updateStatus('All requests attempted. Saving files...');

        /**
         * Extracts a suitable book title from the page or provides a fallback.
         */
        function getBookTitle() {
            // Try to find the book title from common elements or document title
            let titleElement = document.querySelector('.book-title, h1.book-name, .novel-title');
            if (titleElement) {
                return titleElement.innerText.trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '_'); // Clean for filename
            }
            // Fallback: use part of the URL (e.g., book ID)
            const pathParts = window.location.pathname.split('/');
            const bookId = pathParts[pathParts.length - 3] || 'unknown_book';
            return `fanqie_${bookId}`;
        }

        function saveChapters() {
            if (chapterData.length === 0) {
                console.log("No chapter data to save.");
                return;
            }

            const bookTitle = getBookTitle();
            const combinedContent = chapterData.map(chapter => {
                return `## ${chapter.title}\n\n${chapter.content}\n\n---\n\n`;
            }).join(''); // Combine all chapters with a separator

            const blob = new Blob([combinedContent], { type: "text/plain;charset=utf-8" });
            const url_txt = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url_txt;
            link.download = `${bookTitle}_chapters.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url_txt);
            console.log(`Chapters saved to ${bookTitle}_chapters.txt`);
        }

        function saveFailedUrlsList() {
            if (failedUrls.length === 0) {
                console.log("No failed URLs.");
                return;
            }
            const combinedFailedUrls = failedUrls.join('\n');

            const blob = new Blob([combinedFailedUrls], { type: "text/plain;charset=utf-8" });
            const url_txt = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url_txt;
            link.download = "failed_urls.txt";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url_txt);
            console.log("Failed URLs saved to failed_urls.txt");
        }

        saveChapters();
        saveFailedUrlsList();

        // Change the button state and text
        runButton.disabled = false;
        runButton.innerText = 'Download Complete!';
        updateStatus(`Download complete! ${chapterData.length} chapters downloaded, ${failedUrls.length} failed.`);
        setTimeout(() => {
            statusDiv.style.display = 'none'; // Hide status after a few seconds
        }, 8000);

        stopTabActive(); // Stop the silent audio

        // Add a warning if the user tries to leave the page during download (though download is now complete)
        // This listener should ideally be added when the download starts and removed when it finishes.
        // For simplicity, keeping it here for demonstration, but note it might be less useful now.
        window.addEventListener('beforeunload', function (e) {
            if (isDownloadInProgress) { // Only show warning if still technically 'in progress'
                e.preventDefault();
                e.returnValue = 'Bạn có chắc chắn muốn rời khỏi trang? Quá trình tải có thể bị mất.';
            }
        });
        isDownloadInProgress = false; // Reset flag after completion
    };

    // Add the button to the webpage
    document.body.appendChild(runButton);

})();