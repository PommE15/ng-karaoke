'use strict';
/* Controllers */

angular.module('myApp.controllers', [])
  .controller('TempalteCtrlTemp', ['$scope', '$http', 'popcorn', function($scope, $http, popcorn) {
    $scope.noteOn = false;
    $scope.scriptOn = false;
    
    $scope.song = null;
    $http.get('json/toutlebonheurdumonde.json').success(function(data) {
      $scope.song = data;
      popcorn.audio($scope.song.id);
      //angular.forEach, iterator(value, key)
      angular.forEach($scope.song.times, function(time, id){
        popcorn.footnote(id, time.str, time.end);
      });
    });    
  }])
  .controller('TemplateCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
    var songId = $routeParams.songId,
        jsonId = 'json/'+songId+'.json';
    
    $scope.song = null;
    $http.get(jsonId).success(function(data){
      $scope.song = data;
    });
  }])
  .controller('AnchorCtrl', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll) {
    $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
    };
  }]);
