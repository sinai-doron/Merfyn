// by passing an object you can define default values e.g.: []
/*chrome.storage.sync.get({videos: {}}, function (result) {
    // the input argument is ALWAYS an object containing the queried keys
    // so we select the key we need
    var videos = result.videos;
    videos["videoId1"] = {
      videoTitle:"title",
      videoDuration:440,
      videoSavedTime:300
    }

    // set the new array value to the same key
    chrome.storage.local.set({videos: videos}, function () {
        // you can use strings instead of objects
        // if you don't  want to define default values
        chrome.storage.local.get('videos', function (result) {
            console.log(result.videos)
        });
    });
});*/
