var chat ={};
var DB={};

function DBfind(number,callback){
  for (var key in DB){
    if (key===number){
      return callback(["I'm not empty"]);
    }
  }
  return callback([]);

}

function DBinsert(object,callback){
  DB[object.roomNumber]=object.messages;
  return callback();
}


chat.connected = function (request,reply){
  console.log("hey jack");
  var roomNumber=request.params.roomNumber;
  console.log("roomNumber",roomNumber);
  reply.view('chatbox');//when put chatbox in templates use views...
};


chat.message = function (request,reply){

  console.log("hey",request.payload);

};

chat.checkExist = function(request,reply){
  DBfind(request.params.roomNumber,function(data){
    if (data.length>0){reply("true");}
    else {reply("false");}
  });
};

chat.newRoom = function (request,reply){
  var chatroomNum=request.params.roomNumber;
  DBinsert({roomNumber:chatroomNum,messages:[]},function(){
    return reply.redirect('/chatbox/'+chatroomNum);
  });
};

chat.createRoom = function (request,reply) {
  reply.view('createChatRoom');
};


module.exports=chat;
