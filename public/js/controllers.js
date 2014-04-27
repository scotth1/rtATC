'use strict';

/* Controllers */

var app = angular.module('myApp.controllers', ['ngResource']);


app.controller('UserCtrl', ['$scope', '$rootScope', 'UserService', function($scope, $rootScope, user) {
        $rootScope.loggedOn = user.loggedOn; 
        $scope.isCollapsed = true;
        
        $scope.login = function(username, password) {
            console.log("Username: "+username+", current status: "+$rootScope.loggedOn);
            user.username = username;
            user.loggedOn = true;
            $rootScope.loggedOn = user.loggedOn;
            console.log("loggedOn now: "+$rootScope.loggedOn);
            $scope.css = "#";
        }
        
        $scope.user = user;
        
    }]);

app.controller('MyCtrl1', [function() {

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
