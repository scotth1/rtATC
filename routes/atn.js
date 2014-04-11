/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

exports.pollCmds = function(cache) {
    return function(req, res) {
        var sessId = req.param('xid');
        var session = cache.get(sessId);
        if (session == null) {
            res.render('pollCommands', {status: 'NO SESSION', command: '', commandMessage: '', msgLine2: ''});
        } else {
            var currCmd = {command: '', commandMessage: '', msgLine2: ''};
            if (session.cmds.length > 0) {
                currCmd = session.cmds.shift();
            }
            res.render('pollCommands', {status: 'OK', command: currCmd.command, commandMessage: currCmd.commandMessage, msgLine2: currCmd.msgLine2, logonAirport: session.logonAirport});
        }
    };
};

exports.doDepartClearance = function(cache) {
    return function(req, res) {
        var sessId = req.param('xid');
        var session = cache.get(sessId);
        if (session == null) {
            res.render('doDepartClearance', {status: 'NO SESSION'});
        } else {

        }
    };
};


exports.doGetCompanyRoute = function(cache) {
    return function(req, res) {
        var sessId = req.param('xid');
        var session = cache.get(sessId);
        if (session == null) {
            res.render('doGetCompanyRoute', {status: 'NO SESSION'});
        } else {

        }
    };
};


exports.doLogoff = function(cache) {
    return function(req, res) {
        var sessId = req.param('xid');
        var session = cache.get(sessId);
        if (session == null) {
            res.render('doLogoff', {status: 'NO SESSION'});
        } else {
            cache.remove(sessId);
            res.render('doLogoff', {status: 'OK'});
        }
    };
};


exports.doLogon = function(cache) {
    return function(req, res) {
      var callsign = req.param('callsign');
      var user = req.param('user');
      var type = req.param('type');
      var airport = req.param('airport');
      var airline = req.param('airline');
      var session = {callsign: callsign, username: user, aircrafttype: type, loginairport: airport, airline: airline};
      console.log("session params: "+JSON.stringify(session));
      var sessId = cache.generateSession(session);
      res.render('doLogon', {status: 'OK', sessionId: sessId, logonAirport: airport});
    };
};


exports.doPositionReport = function(cache) {
    return function(req, res) {
        var sessId = req.param('xid');
        var session = cache.get(sessId);
        if (session == null) {
            res.render('doPositionReport', {status: 'NO SESSION'});
        } else {
            var reportStr = req.param('positionRecord');
            var report = JSON.parse(reportStr);
            res.render('doPositionReport', {status: 'OK'});
        }
    };
};


exports.doReportMaint = function(cache) {
    return function(req, res) {
        var sessId = req.param('xid');
        var session = cache.get(sessId);
        if (session == null) {
            res.render('doReportMaint', {status: 'NO SESSION'});
        } else {

        }
    };
};


exports.doUpdateController = function(cache) {
    return function(req, res) {
        var sessId = req.param('xid');
        var session = cache.get(sessId);
        if (session == null) {
            res.render('doUpdateController', {status: 'NO SESSION'});
        } else {

        }
    };
};
