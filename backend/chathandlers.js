var chat = {};
var DB = require('../rethinkdb.js');

chat.connected = function (request,reply){
  console.log("hey jack");
  var roomNumber=request.params.roomNumber;
  console.log("roomNumber",roomNumber);
  reply.view('chatbox');
};

chat.checkExist = function(request,reply){
  DB.find('activities', {id: request.params.roomNumber },function(data){
    if (data.length>0){reply("true");}
    else {reply("false");}
  });
};

chat.createRoom = function (request,reply) {
  reply.view('createChatRoom');
};


module.exports=chat;
