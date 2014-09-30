// by passing an object you can define default values e.g.: []
var data = {};
  chrome.storage.sync.get({videos: {}}, function (result) {
    data = result;
    for (key in data.videos){
      $('body').after('<div><img src="' + data.videos[key].thumbnail + '"/><span>'+ data.videos[key].title +'</span></div>');
    }
  });


$( document ).ready(function() {
    for (key in data.videos){
      $('body').after('<div><img src="' + data.videos[key].thumbnail + '"/><span>'+ data.videos[key].title +'</span></div>');
    }

});
