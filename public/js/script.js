var socket=io();

socket.on('userConnected',function(username){
  console.log(username);
  document.getElementById('pastchat').append('<li>'+username+' joined the chat!!!!!</li>');
});

socket.on('postedMessage',function(message){
  console.log("hey",message);
  document.getElementById('pastchat').innerHTML+=('<p>'+message+'</p>');
});


var postMessage = function() {
  var chatPost = document.getElementById('message').value;
  console.log(chatPost);
  socket.emit('postMessage',chatPost);
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
