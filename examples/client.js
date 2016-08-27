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
var mqtt    = require('mqtt');
var mqttrpc = require('../index.js');

var settings = {
  reconnectPeriod: 5000 // chill on the reconnects
}

// client connection
//var mqttclient = mqtt.connect('mqtt://localhost', settings);
var mqttclient = mqtt.connect('mqtt://test1:test1@127.0.0.1:1883', settings);

// build a new RPC client
var client = mqttrpc.client(mqttclient);

// optionally configure the codec, which defaults to JSON, also supports msgpack
//client.format('json');
client.format('msgpack');

// call the remote method
setInterval(function(){
    client.callRemote('proto/time', 'localtime',{}, function(err, data){
        console.log('callRemote',err,data);
    }); 
},5000);
client.callRemote('proto/time', 'localtime',{}, function(err, data){
   console.log('callRemote',err, data );
});
