var socket=require('/server.js').socket;

function chat(request){

  socket.on('connection', function(sock){
    console.log("user connected");
    var username='username';
    socket.emit('userconnected',username); //will change to request.username
  });

}

module.exports=chat;
