'use strict';
/* Directives */

angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  //http://stackoverflow.com/questions/15207788/calling-a-function-when-ng-repeat-has-finished
  directive('repeatReady', ['$timeout', 'popcorn', function($timeout, popcorn) {
    return function(scope, elm, attrs) {
      if (scope.$last) {
        //link media id and source with popcorn
        popcorn.video(scope.song.id, scope.song.src);
        $timeout(function(){
          angular.forEach(scope.song.times, function(time, id){
            //link lyrics with the media
            popcorn.footnote(id, time.str, time.end);
          });
        }, 0);
      }
    };
  }]).
  directive('textEdit', [function() {
    return function(scope, elm, attrs) {
      elm.on('click', function(event) {
        var value = (elm.next().attr('contentEditable')==='false') ? true: false,
            color = (value) ? 'lightcoral': 'darkgrey';
        elm.next().attr('contentEditable', value);
        elm.css('color', color);
        //console.log(value); //for debug
      });
    };
  }]).
  directive('textMark', [function() {
     
    // 37-40: arrows; 66: b, 85: u
    var HOT_KEYS_ARROWS = [37, 38, 39, 40],
        HOT_KEYS_STYLES = [66, 85],
        charCode = 0;

    return function(scope, elm, attrs) {
      
      elm.on("keydown", function(event) {
 
        var keyCode = event.keyCode,
            charCode = event.charCode,
            keyArrows = false, // arrow-*(up/down/left/right) is pressed
            keySelect = false, // shift + arrow-* is preseed, for text selection 
            keyStyles = false; // crtl + b/u is pressed, for text styling 

        if (HOT_KEYS_ARROWS.indexOf(keyCode) !== -1) { keyArrows = true; }
        if (HOT_KEYS_ARROWS.indexOf(keyCode) !== -1 && event.shiftKey) { keySelect = true; }
        if (HOT_KEYS_STYLES.indexOf(keyCode) !== -1 && event.ctrlKey)  { keyStyles = true; } 
        /* bug: fx takes ctrl + b/u these shortcut for browser usage */
        
        // prevent default key events
        if (!keyArrows && !keySelect && !keyStyles) {
          event.preventDefault();
        }
        //else { console.log("key : ", keyCode); } /* for debug */
      });
      
      /*elm.on("keyup", function(event) {
        event.stopPropagation();
      });*/
    };
  }]);
