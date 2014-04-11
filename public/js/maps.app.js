/* 
 * 
 *  $Id$
 * 
 *  maps.app.js
 * 
 *  COPYRIGHT NOTICE:
 *       Copyright (C) 2013 New South Wales Department of Education and Communities
 * 
 *  HISTORY:
 *     $Log$
 * 
 */

'use strict';


// Declare app level module which depends on filters, and services
angular.module('mapApp', [
  'ngRoute',
  'ui.bootstrap',
  'ui.map',
  'mapsApp.filters',
  'mapsApp.services',
  'mapsApp.directives',
  'mapsApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/maps-partial.html', controller: 'MapCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/maps-partial1.html', controller: 'MapCtrl1'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
