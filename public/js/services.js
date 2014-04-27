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