chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "getSelectedCode") {
      var selectedElement = window.getSelection().anchorNode.parentElement;
      var code = selectedElement.innerHTML;
      sendResponse({ code: code });
    }
  });