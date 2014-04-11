'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'nvd3ChartDirectives'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dash', {templateUrl: 'partials/dashboard.html', controller: 'DashCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
