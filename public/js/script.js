var socket=io();
var url=window.location.href.split('/');

socket.on('userConnected',function(username){
  console.log(username);
  document.getElementById('pastchat').innerHTML+=('<p>'+username+' joined the chat!!!!!</p>');
});

socket.on('postedMessage',function(messageObj){
  console.log("hey",messageObj);
    document.getElementById('pastchat').innerHTML+=('<p>'+messageObj.user + ': ' + messageObj.message+'</p>');
});

var postMessage = function() {
  var chatPost = document.getElementById('message').value;
  console.log(chatPost);
  var chatObject={
    chatID:url[url.length-1],
    message:chatPost
  };
  socket.emit('postMessage',chatObject);
};
