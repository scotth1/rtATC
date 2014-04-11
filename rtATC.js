/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var http = require('http');
var path = require('path');
var socketio = require('socket.io');
var cache = require('./cache/atnCache')();
var express = require('express'), app = express(), server = http.createServer(app), routes = require('./routes'), atnRt = require('./routes/atn');
console.log("Created express server");
var io = require('socket.io').listen(server, {'destroy upgrade': false});
io.configure(function() {
    io.set('transports', ['websocket', 'xhr-polling']);
    //io.enable('log');
    io.set('log level', 2);
});

var cql = require('node-cassandra-cql');
var client = new cql.Client({hosts: ['localhost'], keyspace: 'stormscraper'});


var viewEngine = 'jade'; // modify for your view engine
var seq = 1010;
var typeWords = ["State Change", "Device Offline", "Authentication Failed", "User Not Authorised", "Unwilling to perform"];
var statusInterval = 1200;
var intervalRand = 0;
var lastRecord = 0;

app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view engine', viewEngine);
    app.use(express.logger('dev'));
    //app.use(express.bodyParser());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    //app.use(express.cookieParser('snowWhite'));
    //app.use(express.session());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.get('/atn/pollCommands.jsf', atnRt.pollCmds(cache));
    app.get('/atn/doLogon.jsf', atnRt.doLogon(cache));
    app.get('/atn/doLogoff.jsf', atnRt.doLogoff(cache));
    app.get('/atn/doDepartClearance.jsf', atnRt.doDepartClearance(cache));
    app.get('/atn/doGetCompanyRoute.jsf', atnRt.doGetCompanyRoute(cache));
    app.get('/atn/doPositionReport.jsf', atnRt.doPositionReport(cache));
    app.get('/atn/doReportMaint.jsf', atnRt.doReportMaint(cache));
    app.get('/atn/doUpdateController.jsf', atnRt.doUpdateController(cache));
});


server.listen(process.env.PORT || 9080);
var addr = server.address().address;
console.log('Started listening on: '.concat(addr).concat(':').concat(process.env.PORT || 9080));

io.sockets.on('connection', function(socket) {
    console.log("Got connection...");
    var stationList = [];
    stationList.push('abc');
    var consistency = cql.types.consistencies.one;
    setInterval(function() {
        client.eachRow('SELECT url,title,inbound_links,outbound_links,scrape_date from pages where scrape_date > ? limit 15 ALLOW FILTERING', [lastRecord], consistency,
                function(n, row) {
                    //the callback will be invoked per each row as soon as they are received
                    //console.log('temperature value', n, row.temperature);
                    var inboundSet = row.inbound_links;
                    var inboundSetSize = 0;
                    if (inboundSet == null || inboundSet === null || inboundSet.length == 0) {
                        inboundSetSize = 0;
                    } else {
                        inboundSetSize = inboundSet.length;
                    }
                    io.sockets.emit('updateList', {row: [n, row.url, row.title, inboundSetSize, row.scrape_date]});
                    lastRecord = row.scrape_date;
                },
                function(err, rowLength) {
                    if (err) {
                        console.log('Oh dear...' + err);
                    } else {
                        console.log("Got all rows...");
                    }
                    console.log('%d rows where returned', rowLength);
                }
        );

    }, 500);



    //client.execute('SELECT event_time, temperature FROM temperature WHERE station_id=?', stationList, consistency,
    //        function(err, result) {
    //            if (err) {
    //                console.log('execute failed' + err);
    //            } else {
    //                console.log('got temperature: ' + result.rows[0].temperature);
    //            }
    //        }
    //);

});

/************
setInterval(function() {
    var today = new Date();
    var typeRand = Math.floor((Math.random() * typeWords.length));
    var altRand = Math.floor((Math.random() * 8) + 32) * 10;
    var fltNum = Math.floor((Math.random() * 120) + 12);
    //io.sockets.emit('updateList', {row: [seq++, typeWords[typeRand], altRand, fltNum, today]});
    //console.log("check for more rows...");
    intervalRand = Math.floor((Math.random() * 6000));
}, statusInterval + intervalRand);

***************/

/******************
setInterval(function() {
    var today = new Date();
    var setRand = Math.floor((Math.random() * 4) + 1);
    var valueWords = ["One", "Two", "Three", "Four", "Five", "Six"];
    var valueList = [];
    var maxSize = Math.floor((Math.random() * 3) + 3);
    for (var i = 0; i < maxSize; i++) {
        var rnd = Math.floor((Math.random() * 15) + 2);
        valueList.push({key: valueWords[i], y: rnd});
    }
    io.sockets.emit('updateStats', {dataset: setRand, values: valueList});
    intervalRand = Math.floor((Math.random() * 6000));
}, 3600 + intervalRand);

**************/
