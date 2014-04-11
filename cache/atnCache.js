/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var uuid = require('node-uuid');
var atnCache = module.exports = function () {
    var cache = {};
    return {
        get: function (key) { return cache[key]; },
        set: function (key, val) { cache[key] = val; },
        remove: function(key) {
          delete cache[key];
        },
        generateSession: function(session) { 
            var sessId = uuid.v1(); 
            var now = new Date();
            session.sessionId = sessId;
            session.firstContact = now;
            session.lastContact = now;
            session.cmds = [];
            //cache[sessId] = {callsign: callSign, user: username, cmds: [], lastContact: now, firstContact: now, sessionId: sessId, logonAirport: logonAirport};
            cache[sessId] = session;
            return sessId;
        },
        updateContact: function(key) {
            var now = new Date();
            cache[key].lastContact = now;
        }
    };
};