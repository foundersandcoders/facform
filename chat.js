var Chat=require('./chathandlers.js');
exports.register = function (server, options, next) {

    var io = require('socket.io')(server.listener);

    io.on('connection', function (socket) {
        console.log('New connection!');
        // socket.on('hello', Chat.connected);
        io.emit('userConnected',"user");
        socket.on('postMessage',function(message){
          console.log(message);
          //push message to individual chatroom db
          io.emit('postedMessage',message);
        });
    });

    next();
};

exports.register.attributes = {
    name: 'hapi-chat'
};
