'use strict';
/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
.value('version', '0.1')
.factory('popcorn', [function(){
  var pop = null;
  return {
    audio: function(id) {
      pop = Popcorn("#audio"+id);
      //return pop;
    },
    video: function(id, src) {
      var video = Popcorn.HTMLYouTubeVideoElement("#video"+id);
      video.src = src + "?end=0&autoplay=0&controls=1";
      pop = Popcorn(video);
      //return pop;
    },
    footnote: function(id, str, end) {
      if (pop !== null) {
        pop.footnote({
          start: str,
          end: end,
          text: '',
          target: id,
          effect: "applyclass",
          applyclass: "selected"
        });
      } 
      else {
        throw "error: media source is not linked! [popcornjs]"
      }
    } 
   
  };//end of return
}]);

