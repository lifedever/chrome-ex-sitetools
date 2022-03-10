function sendMessageToContentScript(message, callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
      if (callback) callback(response);
    });
  });
}

const domClick = (id) => {
  return new Promise((resolve, reject) => {
    document.getElementById(id).addEventListener('click', function(e) {
      e.preventDefault();
      resolve();
    });
  });
};

/**
 *
 * @param id
 * @param message {cmd, value}
 */
const domClickAndSendMessage = (id, message) => {
  return new Promise((resolve, reject) => {
    domClick(id).then(_ => {
      sendMessageToContentScript(message, function(response) {
        resolve(response);
      });
    });
  });
};

/**
 * 获取网站标题
 */
domClickAndSendMessage('getSiteTitle', {
  cmd: 'getTitle',
}).then(res => {
  alert(res);
});

/**
 * 下载Favicon
 */
domClickAndSendMessage('downloadFavicon', {
  cmd: 'downloadFavicon',
}).then(url => {
  chrome.downloads.download({url: url})
});
