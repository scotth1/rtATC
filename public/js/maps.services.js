/* 
 * 
 *  $Id$
 * 
 *  maps.services.js
 * 
 *  COPYRIGHT NOTICE:
 *       Copyright (C) 2013 New South Wales Department of Education and Communities
 * 
 *  HISTORY:
 *     $Log$
 * 
 */
'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('mapsApp.services', []).
  value('version', '0.1');

