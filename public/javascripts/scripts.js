$(function () {
    var socket = io();
    socket.emit('chat message', 'Hello World!');
});