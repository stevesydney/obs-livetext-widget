const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    maxHttpBufferSize: 1e8
  });

app.get('/live-text', (req, res) => {
    res.sendFile(__dirname + '/live-text.html');
});

app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + '/dashboard.html');
});

let currentLiveText;

io.on('connection', (socket) => {
    if (currentLiveText) {
        io.emit('live text', currentLiveText);
    }
    socket.on('live text', (liveText) => {
        io.emit('live text', liveText);
        currentLiveText = liveText;
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});