var socket=io();

socket.on('userconnected',function(username){
  document.getElementById('pastchat').append('<p>'+username+' joined the chat!!!!!</p>');
});
