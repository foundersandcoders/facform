var Chat=require('./chathandlers.js');
var DB = require('../rethinkdb.js');
exports.register = function (server, options, next) {
  var io = require('socket.io')(server.listener);

  io.on('connection', function (socket) {
    var referer = socket.handshake.headers.referer.split('/');
    var chatNumber = referer[referer.length-1];

    socket.join("'" + chatNumber + "'");
    console.log('New connection: ' + chatNumber);
    io.to("'" + chatNumber + "'").emit('userConnected',"user");

    socket.on('postMessage',function(message){
      console.log(message);
      message.time = Date.now();
      message.user = 'user';

      var currentMessages;
      DB.read('activities', {id: chatNumber}, function(data){
        currentMessages = data.messages;
      });
      currentMessages.push(message);
      DB.update('activities', chatNumber, {messages: currentMessages}, function(data){
        console.log(data + ' added to database');
      });

      io.to("'" + chatNumber + "'").emit('postedMessage',message);

    });
  });
  next();
};

exports.register.attributes = {
    name: 'hapi-chat'
};
