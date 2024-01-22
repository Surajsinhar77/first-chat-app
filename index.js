const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const {Server}  = require('socket.io');

const io = new Server(server);

const fileLocation = path.join(__dirname+"/template" ,'/index.html');


app.get('/', (req, res) => {
    res.sendFile(fileLocation);
});

io.on('connection', (socket)=>{
    const id = socket.id.substring(0,4);
    socket.on('msg sent', (msg)=>{
        socket.broadcast.emit('receiveMsg', {id : id, msg:msg});
    })
})


server.listen(3000, () => {
  console.log('listening on *:3000');
});