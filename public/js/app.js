'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', [
    'ngRoute',
    'ui.bootstrap',
    'ui.map',
    'myApp.filters',
    'myApp.services',
    'myApp.directives',
    'myApp.controllers',
    'nvd3ChartDirectives'
]).
        config(['$routeProvider', function($routeProvider) {
                $routeProvider.when('/view1', {templateUrl: 'partials/cover.html', controller: 'MyCtrl1'});
                $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'MyCtrl1'});
                $routeProvider.when('/profile', {templateUrl: 'partials/profile.html', controller: 'MyCtrl1'});
                $routeProvider.when('/signup', {templateUrl: 'partials/signup.html', controller: 'UserCtrl'});
                $routeProvider.when('/dash', {templateUrl: 'partials/dashboard.html', controller: 'DashCtrl1'});
                $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
                $routeProvider.when('/map1', {templateUrl: 'partials/maps-partial.html', controller: 'MapCtrl1'});
                $routeProvider.when('/map2', {templateUrl: 'partials/maps-partial1.html', controller: 'MapCtrl1'});
                $routeProvider.otherwise({redirectTo: '/view1'});
            }]);


app.run(['$rootScope', '$window', 'UserService',
    function($rootScope, $window, sAuth) {

        $rootScope.user = {};

        $window.fbAsyncInit = function() {
            // Executed when the SDK is loaded

            FB.init({
                /* 
                 The app id of the web app;
                 To register a new app visit Facebook App Dashboard
                 ( https://developers.facebook.com/apps/ ) 
                 */
                appId: '702115109851800',
                /* 
                 Adding a Channel File improves the performance 
                 of the javascript SDK, by addressing issues 
                 with cross-domain communication in certain browsers. 
                 */
                channelUrl: 'app/channel.html',
                /* 
                 Set if you want to check the authentication status
                 at the start up of the app 
                 */
                status: true,
                /* 
                 Enable cookies to allow the server to access 
                 the session 
                 */
                cookie: true,
                /* Parse XFBML */
                xfbml: true
            });
            sAuth.watchAuthenticationStatusChange();

        };

    }]);

/**************************
 app.run(function ($rootScope) {
 window.fbAsyncInit = function () {
 FB.init({
 appId: '702115109851800',
 status:true,
 cookie:true,
 xfbml:true
 });
 
 FB.Event.subscribe('auth.statusChange', function(response) {
 $rootScope.$broadcast("fb_statusChange", {'status': response.status});
 });
 };
 
 (function (d) {
 var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
 if (d.getElementById(id)) {
 return;
 }
 js = d.createElement('script');
 js.id = id;
 js.async = true;
 js.src = "//connect.facebook.net/en_US/all.js";
 ref.parentNode.insertBefore(js, ref);
 }(document));
 });
 ***************************/