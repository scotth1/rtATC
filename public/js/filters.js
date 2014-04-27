'use strict';

/* Filters */

var app = angular.module('myApp.filters', []);
  app.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
  app.filter('cover',['$location',function($location) {
    return function(text) {
        var currPath = $location.path();
        //console.log("hash: "+currPath)
        if (currPath != "/view1") {
            text = "";
        }
        return String(text);
    }
  }]);
