//mine
const express = require('express')
const path = require('path')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

console.log("outside io");

io.on('connection', (socket) => {

  console.log('User Conncetion');

  socket.on('connect user', (user) => {
    console.log("Connected user ");
    io.emit('connect user', user);
  });

  socket.on('on typing', (typing) => {
    console.log("Typing.... ");
    io.emit('on typing', typing);
  });

  socket.on('chat message', (msg) => {
    console.log("Message " + msg['message']);
    io.emit('chat message', msg);
  });
});

http.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});