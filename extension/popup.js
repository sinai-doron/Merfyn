// by passing an object you can define default values e.g.: []
var data = {};
  chrome.storage.sync.get({videos: {}}, function (result) {
    data = result;
      for (key in data.videos){
          var time = data.videos[key].duration;
          var minutes = Math.floor(time / 60);
          var seconds = time - (minutes * 60);
          $('body').append('<div class="main" style=clear:both;"><img class = "thumbnail" src="' + data.videos[key].thumbnail + '"/><div class="title"><a href="'+ data.videos[key].player+'" target="_blank">'+ data.videos[key].title +'<br/></a></div><span class="title-info">Duration:'+ minutes + ':' + seconds +'</span><br/></div>');
      }
  });