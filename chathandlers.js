var chat ={};

chat.connected = function (request,reply){
  //
  // socket.on('connection', function(sock){
  //   console.log("user connected");
  //   var username='username';
  //   socket.emit('userconnected',username); //will change to request.username
  // });
  reply.file('./chatbox.html');//when put chatbox in templates use views...
};

chat.message = function (request,reply){

  console.log("hey",request.payload);

};

module.exports=chat;
