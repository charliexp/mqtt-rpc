/*************************************************************************\
 * File Name    : client.js                                              *
 * --------------------------------------------------------------------- *
 * Title        :                                                        *
 * Revision     : V1.0                                                   *
 * Notes        :                                                        *
 * --------------------------------------------------------------------- *
 * Revision History:                                                     *
 *   When             Who         Revision       Description of change   *
 * -----------    -----------    ---------      ------------------------ *
 * 12-23-2015      charlie_weng     V1.0          Created the program     *
 *                                                                       *
\*************************************************************************/
var mqtt = require('mqtt');
var mqttrpc = require('../index.js');

var settings = {
  reconnectPeriod: 5000 // chill on the reconnects
}

// client connection
//var mqttclient = mqtt.connect('mqtt://localhost', settings);
var mqttclient = mqtt.connect('mqtt://test1:test1@127.0.0.1:1883', settings);

// build a mqtt new RPC server
var server = mqttrpc.server(mqttclient);

// optionally configure the codec, which defaults to JSON, also supports msgpack
//server.format('json');
server.format('msgpack');

// provide a new method
server.provide('proto/time', 'localtime', function (args, cb) {
  console.log('localtime',new Date());
  cb(null, new Date());
});

