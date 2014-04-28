'use strict';

/* Controllers */

var app = angular.module('myApp.controllers', ['ngResource']);

var markers = [];

app.controller('UserCtrl', ['$scope', '$rootScope', 'UserService', function($scope, $rootScope, user) {
        $rootScope.loggedOn = user.loggedOn;
        $scope.isCollapsed = true;

        $scope.login = function(username, password) {
            console.log("Username: " + username + ", current status: " + $rootScope.loggedOn);
            user.username = username;
            user.loggedOn = true;
            $rootScope.loggedOn = user.loggedOn;
            console.log("loggedOn now: " + $rootScope.loggedOn);
        };

        $scope.user = user;

        $scope.signIn = function(authResult) {
            $scope.$apply(function() {
                $scope.processAuth(authResult);
            });
        }

        $scope.processAuth = function(authResult) {
            $scope.immediateFailed = true;
            if ($scope.isSignedIn) {
                return 0;
            }
            if (authResult['access_token']) {
                $scope.immediateFailed = false;
                console.log("Google+ signed in.");
                user.loggedOn = true;
                // Successfully authorized, create session
                //PhotoHuntApi.signIn(authResult).then(function(response) {
                //    $scope.signedIn(response.data);
                //});
            } else if (authResult['error']) {
                if (authResult['error'] == 'immediate_failed') {
                    $scope.immediateFailed = true;
                } else {
                    console.log('Error:' + authResult['error']);
                }
            }
        }

        $scope.renderSignIn = function() {
            gapi.signin.render('myGsignin', {
                'callback': $scope.signIn,
                'clientid': "674673148216-rhrflet3bsb78ilkh8ndg156icqh8kuv.apps.googleusercontent.com",
                'requestvisibleactions': "",
                'scope': "profile",
                // Remove the comment below if you have configured
                // appackagename in services.js
                //'apppackagename': Conf.apppackagename,
                'theme': 'dark',
                'cookiepolicy': "single_host_origin"
            });
        }
        
        $scope.renderSignIn();
  

    }]);

app.controller('MyCtrl1', [function() {

    }]);

app.controller('MapCtrl1', ['$scope', function($scope) {
        $scope.myMarkers = markers;

        $scope.mapOptions = {
            center: new google.maps.LatLng(-33.942876, 151.177178),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.addMarker = function($event, $params) {
            markers.push(new google.maps.Marker({
                map: $scope.myMap,
                position: $params[0].latLng
            }));
        };

        $scope.setZoomMessage = function(zoom) {
            $scope.zoomMessage = 'You just zoomed to ' + zoom + '!';
            console.log(zoom, 'zoomed')
        };

        $scope.openMarkerInfo = function(marker) {
            $scope.currentMarker = marker;
            $scope.currentMarkerLat = marker.getPosition().lat();
            $scope.currentMarkerLng = marker.getPosition().lng();
            var degLat = Math.floor(marker.getPosition().lat());
            var degLon = Math.floor(marker.getPosition().lng());
            $scope.currentMarkerLatDM = degLat + " " + ((marker.getPosition().lat() - degLat) * 60).toFixed(5);
            $scope.currentMarkerLngDM = degLon + " " + ((marker.getPosition().lng() - degLon) * 60).toFixed(5);
            $scope.myInfoWindow.open($scope.myMap, marker);
        };

        $scope.setMarkerPosition = function(marker, lat, lng) {
            marker.setPosition(new google.maps.LatLng(lat, lng));
        };

    }]);


app.controller('DashCtrl1', ['$scope', 'socket', function($scope, socket) {
        $scope.exampleData1 = [
            {key: "One", y: 5},
            {key: "Two", y: 2},
            {key: "Three", y: 9},
            {key: "Four", y: 7},
            {key: "Five", y: 4},
            {key: "Six", y: 3},
            {key: "Seven", y: 9}
        ];

        $scope.exampleData2 = [
            {key: "One", y: 5},
            {key: "Two", y: 2},
            {key: "Three", y: 9},
            {key: "Four", y: 7},
            {key: "Five", y: 4}
        ];

        $scope.exampleData3 = [
            {key: "One", y: 1},
            {key: "Two", y: 4},
            {key: "Three", y: 7},
            {key: "Four", y: 10},
            {key: "Five", y: 4},
            {key: "Six", y: 2}
        ];

        $scope.exampleData4 = [
            {key: "One", y: 2},
            {key: "Two", y: 2},
            {key: "Three", y: 9},
            {key: "Four", y: 7},
            {key: "Five", y: 2}
        ];

        socket.on("updateStats", function(data) {
            if (data.dataset == 1) {
                $scope.exampleData1 = data.values;
            }
            if (data.dataset == 2) {
                $scope.exampleData2 = data.values;
            }
            if (data.dataset == 3) {
                $scope.exampleData3 = data.values;
            }
            if (data.dataset == 4) {
                $scope.exampleData4 = data.values;
            }
        });

        socket.on("updateList", function(data) {
            $scope.tablelist.shift();
            $scope.tablelist.push(data);
        });


        $scope.xFunction = function() {
            return function(d) {
                return d.key;
            };
        }
        $scope.yFunction = function() {
            return function(d) {
                return d.y;
            };
        }

        $scope.descriptionFunction = function() {
            return function(d) {
                return d.key;
            }
        }

        $scope.tablelist = [
            {row: ["1,001",
                    "Lorem",
                    "ipsum",
                    "dolor",
                    "sit"]},
            {row: ["1,002",
                    "amet",
                    "consectetur",
                    "adipiscing",
                    "elit"]},
            {row: ["1,003",
                    "Integer",
                    "nec",
                    "odio",
                    "Praesent"]},
            {row: ["1,003",
                    "libero",
                    "Sed",
                    "cursus",
                    "ante"]},
            {row: ["1,004",
                    "dapibus",
                    "diam",
                    "Sed",
                    "nisi"]},
            {row: ["1,005",
                    "Nulla",
                    "quis",
                    "sem",
                    "at"]},
            {row: ["1,006",
                    "nibh",
                    "elementum",
                    "imperdiet",
                    "Duis"]},
            {row: ["1,007",
                    "sagittis",
                    "ipsum",
                    "Praesent",
                    "mauris"]},
            {row: ["1,008",
                    "Fusce",
                    "nec",
                    "tellus",
                    "sed"]},
            {row: ["1,009",
                    "augue",
                    "semper",
                    "porta",
                    "Mauris"]},
            {row: ["1,010",
                    "massa",
                    "Vestibulum",
                    "lacinia",
                    "arcu"]},
            {row: ["1,011",
                    "eget",
                    "nulla",
                    "Class",
                    "aptent"]},
            {row: ["1,012",
                    "taciti",
                    "sociosqu",
                    "ad",
                    "litora"]},
            {row: ["1,013",
                    "torquent",
                    "per",
                    "conubia",
                    "nostra"]},
            {row: ["1,014",
                    "per",
                    "inceptos",
                    "himenaeos",
                    "Curabitur"]},
            {row: ["1,015",
                    "sodales",
                    "ligula",
                    "in",
                    "libero"]}

        ];

    }]);


app.controller('AlertDemoCtrl', ['$scope', function($scope) {
        $scope.alerts = [
            {type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'},
            {type: 'success', msg: 'Well done! You successfully read this important alert message.'}
        ];

        $scope.addAlert = function() {
            $scope.alerts.push({msg: "Another alert!"});
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    }]);
