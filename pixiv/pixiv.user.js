// ==UserScript==
// @name          Lấy toàn bộ nội dung văn bản của trang
// @namespace     http://tampermonkey.net/
// @version       1.0
// @description   Gửi yêu cầu đến URL và lấy toàn bộ nội dung văn bản của trang
// @match         https://www.pixiv.net/novel
// @grant         GM.xmlHttpRequest
// @grant         GM.download
// ==/UserScript==

var url = "https://www.pixiv.net/novel/show.php?id=15270293";

function getIdFromUrl(url) {
  var match = url.match(/id=(\d+)/);
  if (match) {
    return match[1]; // Return only the ID
  }
  return null;
}

var id = getIdFromUrl(url); // Get the ID from the URL

function handleResponse(response) {
  if (response.readyState === 4 && response.status === 200) {
    // Create a new DOM Parser
    var parser = new DOMParser();
    // Parse the HTML string into a Document object
    var doc = parser.parseFromString(response.responseText, 'text/html');
    // Find the meta tag
    var metaTag = doc.querySelector('meta[name="preload-data"][id="meta-preload-data"]');
    if (metaTag) {
      // If the meta tag is found, parse its content
      var content = JSON.parse(metaTag.getAttribute('content'));
      // Get the value of "novel"
      var novel = content.novel;
      // get value of id number
      var data = novel[id]; // Use the ID from the URL
      //get content
      var content = data.content;
      console.log(content);
      //đưa vào file txt rồi tải xuống
      var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
      var blobURL = URL.createObjectURL(blob);
      GM.download(blobURL, "novel.txt");
    } else {
      // If the meta tag is not found, display a message
      console.log('Meta tag not found');
    }
  }
}

// Gửi yêu cầu GET đến URL
GM.xmlHttpRequest({
  method: "GET",
  url: url,
  onload: handleResponse
});