/* 
 * 
 *  $Id$
 * 
 *  maps.controllers.js
 * 
 *  COPYRIGHT NOTICE:
 *       Copyright (C) 2013 New South Wales Department of Education and Communities
 * 
 *  HISTORY:
 *     $Log$
 * 
 */


'use strict';

var markers = [];

/* Controllers */

angular.module('mapsApp.controllers', []).
        controller('MapCtrl1', ['$scope', function($scope) {
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
                    $scope.currentMarkerLatDM = degLat+" "+((marker.getPosition().lat()-degLat)*60).toFixed(5);
                    $scope.currentMarkerLngDM = degLon+" "+((marker.getPosition().lng()-degLon)*60).toFixed(5);
                    $scope.myInfoWindow.open($scope.myMap, marker);
                };

                $scope.setMarkerPosition = function(marker, lat, lng) {
                    marker.setPosition(new google.maps.LatLng(lat, lng));
                };

            }])
        .controller('MapCtrl2', [function() {

            }]);
