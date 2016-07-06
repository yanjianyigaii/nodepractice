var http = require('http');
var EventEmitter = require('events').EventEmitter;
var makeRequest = require('./custom');
var express = require('express');
var path = require('path');
var app = express();

var server = http.createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(client){
    //console.log('Client connected...');
    //console.log(client);
    client.emit('messages', { title: 'world' });
    client.on('messages', function(data){
        client.broadcast.emit('messages', data);
    });
});
app.use(express.static(path.join(__dirname)));
app.get('/', function(req, res){
    res.sendFile(__dirname+'/views/index.html');
});
server.listen(8080);


// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html');
// })
// app.listen(8080);
// http.createServer(function(request, response){//register event "request" -> event loop for requests
//     response.writeHead(200);
//     // response.write("Hello, this is dog");
//     // response.end();
//     response.write("Dog is running");
//     setTimeout(function(){//register event "setTimeout" -> add to event queue
//         response.write("Dog is done");
//         response.end();
//     }, 5000);
// }).listen(8080);
// console.log('listen on port 8080');
// var server = http.createServer();
// server.on('request', function(request, response){
//    response.writeHead(200);
//    response.end(); 
// }).listen(8080);

//makeRequest("sample request 1");
//makeRequest("sample request 2");




var logger = new EventEmitter();
logger.on('error', function(msg){
    console.log('ERR: ' + msg);
});
//logger.emit('error', 'testing error message');