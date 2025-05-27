// ==UserScript==
// @name          zsdade dowloader
// @namespace     your-namespace
// @version       1.0
// @description   Scrapes website content and saves it to a file
// @match         https://www.zsdade.com/books/142920/*
// @grant         GM_xmlhttpRequest
// @run-at        document-end
// ==/UserScript==

(function() {
    var content = '';
  
    for (var i = 1; i <= 887; i++) {
      var url = 'https://www.zsdade.com/books/142920/' + i + '.html';
  
      GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function(response) {
          var parser = new DOMParser();
          var htmlDoc = parser.parseFromString(response.responseText, 'text/html');
  
          var chapter_name = htmlDoc.querySelector('h1.wap_none');
          var div = htmlDoc.querySelector('div#chaptercontent');
          var chapter_text = '';
  
          for (var j = 0; j < div.childNodes.length; j++) {
            var node = div.childNodes[j];
            if (node.nodeType === Node.TEXT_NODE) {
              chapter_text += node.textContent.trim() + '\n';
            } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'BR') {
              chapter_text += '\n';
            }
          }
  
          chapter_text = chapter_text.replace('请收藏本站：https://www.zsdade.com。', '');
          chapter_text = chapter_text.replace('笔趣阁手机版：https://m.zsdade.com', '');
  
          content += chapter_name.textContent + '\n' + chapter_text + '\n\n';
  
          console.log('Chapter ' + i + ' is done!');
  
          if (i === 887) {
            var blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'content.txt';
            a.click();
          }
        }
      });
    }
  })();