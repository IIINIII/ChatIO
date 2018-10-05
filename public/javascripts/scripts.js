$(function () {
    var socket = null;

    $('#formSendMessage').submit(function (event) {
        $('#msg').val(function (index, value) {
            if (socket) {
                socket.emit('chat_msg', { msg: value, to: 'all' });
            }

            return '';
        });

        event.preventDefault();
    });

    $('#formLogin').submit(function () {
        socket = io();

        socket.emit('auth', { username: $('#username').val(), password: $('#password').val() });

        socket.on('chat_msg', function (data) {
            var msg = $(document.createElement('div'));
            msg.text(data.msg);
            msg.addClass('message');
            msg = $(document.createElement('div')).append(msg);
            msg.addClass('message-wrapper');

            if (data.from === 'admin') {
                msg.addClass('by-me');
            } else {
                msg.addClass('to-me');
            }

            $('#messages').append(msg);
        });

        event.preventDefault();
    });
});