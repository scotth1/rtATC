/* 
 * 
 *  $Id$
 * 
 *  maps.filters.js
 * 
 *  COPYRIGHT NOTICE:
 *       Copyright (C) 2013 New South Wales Department of Education and Communities
 * 
 *  HISTORY:
 *     $Log$
 * 
 */
'use strict';

/* Filters */

angular.module('mapsApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
