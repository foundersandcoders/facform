var socket=io();
var url=window.location.href.split('/');




socket.on('userConnected',function(username){
  console.log(username);
  document.getElementById('pastchat').innerHTML+=('<p>'+username+' joined the chat!!!!!</p>');
});

socket.on('postedMessage',function(messageObj){
  console.log("hey",messageObj);
  // if (messageObj.chatID === url[url.length-1]){
    document.getElementById('pastchat').innerHTML+=('<p>'+messageObj.message+'</p>');
  // }
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




// // A function that assigns a token to anyone who joins a conversation
// var setRoom = function () {
//
//
// }
//
// //A function that
//
// socket.on('message', function (data) {
//   addMessage(data);
// })
//
//
// function addMessage(data) {
//   //append data to document
// }
