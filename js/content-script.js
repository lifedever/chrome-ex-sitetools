chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
  console.log('request cmd', request.cmd);
  if (request.cmd === 'getTitle') {
    var title = document.title;
    sendResponse(title);
  }
  if (request.cmd === 'downloadFavicon') {
    var dom = $('link[rel="shortcut icon"]')[0] || $('link[rel="icon"]')[0];
    if (dom) {
      var url = dom.href;
      sendResponse(url);
    } else {
      alert('未检测到favicon！');
    }
  }
});
