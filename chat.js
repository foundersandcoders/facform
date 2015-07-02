var Chat=require('./chathandlers.js');
exports.register = function (server, options, next) {
    var io = require('socket.io')(server.listener);

    io.on('connection', function (socket) {
      var referer = socket.handshake.headers.referer.split('/');
      var chatNumber = referer[referer.length-1];
      socket.join("'" + chatNumber + "'");
      console.log(chatNumber);
        console.log('New connection: ' + chatNumber);
        // socket.on('hello', Chat.connected);
        io.to("'" + chatNumber + "'").emit('userConnected',"user");
        socket.on('postMessage',function(message){
          console.log(message);
          message.user = 'user';
          //push message to individual chatroom db
          io.to("'" + chatNumber + "'").emit('postedMessage',message);
        });
    });

    next();
};

exports.register.attributes = {
    name: 'hapi-chat'
};
