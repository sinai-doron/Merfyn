
// For simple requests:
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if (sender.id !== "kipebdaihibhoikeghkabcglgdljffhe")
      return;  // don't allow this extension access
    if (request.action === "is"){
      var is = false;
      var videoId = request.videoId;
      chrome.storage.sync.get({videos: {}}, function (result) {
          // the input argument is ALWAYS an object containing the queried keys
          // so we select the key we need
          var videos = result.videos;
          if(videos[videoId]){
            is = true;
          }
          sendResponse({"is": is});
      });
    }

    else if(request.action === "add"){
      var videoId = request.videoId;
      chrome.storage.sync.get({videos: {}}, function (result) {
          // the input argument is ALWAYS an object containing the queried keys
          // so we select the key we need
          var videos = result.videos;
          if(!videos[videoId]){
            var  httpRequest = new XMLHttpRequest();
            httpRequest.open('GET', 'http://gdata.youtube.com/feeds/api/videos/' + videoId +'?v=2&alt=jsonc');
            httpRequest.onreadystatechange = function(){
               if (httpRequest.readyState === 4) {
                  if (httpRequest.status === 200) {
                      var data = JSON.parse(httpRequest.responseText);
                      chrome.storage.sync.get({videos: {}}, function (result) {
                        var videosArray = result.videos;
                        videosArray[videoId] = {
                            "thumbnail":data.data.thumbnail.hqDefault,
                            "title":data.data.title,
                            "player":data.data.player.default,
                            "duration":data.data.duration
                        }
                        chrome.storage.sync.set({videos: videosArray}, function (result) {
                          sendResponse({"is": true});
                        });
                      })

                  }
                  else {
                    console.log('error');
                  }
                }
              }
              httpRequest.send();
          }
          else{
            sendResponse({"is": true});
          }
      });
    }


    return true;
  });
