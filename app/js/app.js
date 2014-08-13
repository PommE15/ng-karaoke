'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ui.bootstrap',
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/template1/bdmonde', {
    templateUrl: 'partials/template1.html', 
    controller : 'TempalteCtrlTemp'
  });
  $routeProvider.when('/template2/:songId', {
    templateUrl: 'partials/template2.html', 
    controller : 'TemplateCtrl'
  });
  $routeProvider.when('/template3/:songId', {
    templateUrl: 'partials/template3.html', 
    controller : 'TemplateCtrl'
  });
  $routeProvider.otherwise({redirectTo: '/template3/babe'});
}]);
