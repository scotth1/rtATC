/* 
 * 
 *  $Id$
 * 
 *  maps.directives.js
 * 
 *  COPYRIGHT NOTICE:
 *       Copyright (C) 2013 New South Wales Department of Education and Communities
 * 
 *  HISTORY:
 *     $Log$
 * 
 */

'use strict';

/* Directives */


angular.module('mapsApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

