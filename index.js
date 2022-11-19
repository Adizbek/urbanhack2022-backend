const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http');

const server = http.createServer(app);

const {Server} = require("socket.io");

// upgrade
const io = new Server(server, {
    cors: {
        methods: ["GET", "POST"],
        allowedHeaders: ['access-control-allow-origin'],
        credentials: true
    }
});

const state = {
    templateId: 0
}

io.on('connection', (socket) => {
    socket.on('setTemplate', (payload) => {
        state.templateId = payload.templateId
        io.emit('template', state.templateId)
    })

    socket.emit('template', state.templateId)
});

server.listen(4000, () => {
    console.log('listening on *:4000');
});