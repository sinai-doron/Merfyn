// by passing an object you can define default values e.g.: []
var data = {};
  chrome.storage.sync.get({videos: {}}, function (result) {
    data = result;
      for (key in data.videos){
          var time = data.videos[key].duration;
          var minutes = Math.floor(time / 60);
          var seconds = time - (minutes * 60);
          $('body').append('<div class="main" style=clear:both;"><span class="remove" id="' + key +'"></span><img class = "thumbnail" src="' + data.videos[key].thumbnail + '"/><div class="title"><a href="'+ data.videos[key].player+'" target="_blank">'+ data.videos[key].title +'<br/></a></div><span class="title-info">Duration:'+ minutes + ':' + seconds +'</span><br/></div>');
      }
      for (key in data.videos){
          var c =  (function (a){
              var b = a;
              return function(){
                  chrome.storage.sync.get({videos: {}}, function (result) {
                      var v = result.videos;
                      delete v[b];
                      data.videos = v;
                      chrome.storage.sync.set({videos: v}, function (result) {
                        $('body').html('');
                          for (key in data.videos){
                              var time = data.videos[key].duration;
                              var minutes = Math.floor(time / 60);
                              var seconds = time - (minutes * 60);
                              $('body').append('<div class="main" style=clear:both;"><span class="remove" id="' + key +'"></span><img class = "thumbnail" src="' + data.videos[key].thumbnail + '"/><div class="title"><a href="'+ data.videos[key].player+'" target="_blank">'+ data.videos[key].title +'<br/></a></div><span class="title-info">Duration:'+ minutes + ':' + seconds +'</span><br/></div>');
                          }
                      });
                  });
              }
          })(key);
          $( "#" + key ).click(c);
      }
  });