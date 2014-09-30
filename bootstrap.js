
// when the extension is first installed
/*chrome.runtime.onInstalled.addListener(function(details) {
    localStorage["be_a_buzzkill"] = true;
});*/
// Listen for any changes to the URL of any tab.
// see: http://developer.chrome.com/extensions/tabs.html#event-onUpdated
function getParamsFromUrl(url){
  var pairs = url.substring(url.indexOf('?') + 1).split('&');
  var result = {}
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    result[pair[0]] = pair[1]
  }
  return result;
}

var merfynExtensionId = "ijkohghlekpfjpdhglmnnefaehnkgdom";


chrome.tabs.onUpdated.addListener(function(id, info, tab){

    if (tab.url.toLowerCase().indexOf("youtube.com/watch") !== -1){
          //chrome.pageAction.show(tab.id);
          var videoId = getParamsFromUrl(tab.url)["v"];
          chrome.runtime.sendMessage(merfynExtensionId, {action: "is", videoId: videoId},{},
          function(response) {
            if(!response)
              return;
            if(response.is){
              chrome.pageAction.setIcon({tabId: tab.id, path: 'resources/icon38.png'});
            }
            else{
              chrome.pageAction.setIcon({tabId: tab.id, path: 'resources/icon38grey.png'});
            }
            chrome.pageAction.show(tab.id);
          });

        return;
    }


});


chrome.pageAction.onClicked.addListener(function(tab) {
    var videoId = getParamsFromUrl(tab.url)["v"];
    chrome.runtime.sendMessage(merfynExtensionId, {action: "add", videoId: videoId},{},
    function(response) {
      if(!response)
        return;
      if(response.is){
        chrome.pageAction.setIcon({tabId: tab.id, path: 'resources/icon38.png'});
      }
      else{
        chrome.pageAction.setIcon({tabId: tab.id, path: 'resources/icon38grey.png'});
      }
      chrome.pageAction.show(tab.id);
    });
});
