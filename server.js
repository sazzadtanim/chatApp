// import modules
// first 3 line a 3 ta module add korlam
// tarpor express app add korlam, tarpor http er jonno server add korlam , tarpor socket io er moddhe server send korlam.
var express = require('express'),
    http = require('http'),
    socketio = require('socket.io'),
    app= express(),
    server = http.createServer(app),
    io = socketio(server),
    msg='';

// server start korbo kemne ?
server.listen(8080, function  () {
  // console.log('server is running..');
});


// home page er jonno ki korbo ?  jokhon '/' pabe tokhon tate index.html send korbo
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
    // console.log('OK, index.html has sent');
});

io.on('connection', function(socket){
  // client theke send kora data recieve/on korbo kemne ?
      socket.on('clientMessage', function(message){
            // server theke client a data send/emit korbo kemne?
            io.emit('serverMessage', message);
      });
      // user disconnect hole sobaike ta janano
      //'disconnect' event ta built in
      socket.on('disconnect', function(message){
            socket.broadcast.emit('serverMessage', 'user disconnected');
      });
      // new user connection notify
      socket.broadcast.emit('serverMessage', 'an user is connected');

});
