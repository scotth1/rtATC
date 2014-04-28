'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var app = angular.module('myApp.services', []);

// Demonstrate how to register services
// In this case it is a simple value service.
app.value('version', '0.0.1');


app.factory('UserService', function() {
    console.log("init UserService factory");
    var user = {
        username: '',
        loggedOn: false
    };

    return  {
        login: function(username, password) {
            user = {username: username,
                loggedOn: true,
                firstName: '',
                familyName: ''};
            return $rootScope.loggedOn = true;
        },
        isLoggedOn: function() {
            return user.loggedOn;
        },
        getUsername: function() {
            return user.username;
        },
        getUserInfo: function() {
            return user;
        },
        watchLoginChange: function() {
            var _self = this;
            FB.Event.subscribe('auth.authResponseChange', function(response) {
                if (response.status === 'connected') {
                    /* 
                     The user is already logged, 
                     is possible retrieve his personal info
                     */
                    _self.getUserInfo();

                    /*
                     This is also the point where you should create a 
                     session for the current user.
                     For this purpose you can use the data inside the 
                     response.authResponse object.
                     */
                } else {
                    /*
                     The user is not logged to the app, or into Facebook:
                     destroy the session on the server.
                     */
                }
            });
        }
    };
});

app.factory('socket', function($rootScope) {
    var socket = io.connect();
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});

app.factory('Facebook', function($rootScope) {
    return {
        getLoginStatus: function() {
            FB.getLoginStatus(function(response) {
                $rootScope.$broadcast("fb_statusChange", {'status': response.status});
            }, true);
        },
        login: function() {
            FB.getLoginStatus(function(response) {
                switch (response.status) {
                    case 'connected':
                        $rootScope.$broadcast('fb_connected', {facebook_id: response.authResponse.userID});
                        break;
                    case 'not_authorized':
                    case 'unknown':
                        FB.login(function(response) {
                            if (response.authResponse) {
                                $rootScope.$broadcast('fb_connected', {
                                    facebook_id: response.authResponse.userID,
                                    userNotAuthorized: true
                                });
                            } else {
                                $rootScope.$broadcast('fb_login_failed');
                            }
                        }, {scope: 'read_stream, publish_stream, email'});
                        break;
                    default:
                        FB.login(function(response) {
                            if (response.authResponse) {
                                $rootScope.$broadcast('fb_connected', {facebook_id: response.authResponse.userID});
                                $rootScope.$broadcast('fb_get_login_status');
                            } else {
                                $rootScope.$broadcast('fb_login_failed');
                            }
                        });
                        break;
                }
            }, true);
        },
        logout: function() {
            FB.logout(function(response) {
                if (response) {
                    $rootScope.$broadcast('fb_logout_succeded');
                } else {
                    $rootScope.$broadcast('fb_logout_failed');
                }
            });
        },
        unsubscribe: function() {
            FB.api("/me/permissions", "DELETE", function(response) {
                $rootScope.$broadcast('fb_get_login_status');
            });
        }
    };
});