var createChatRoom = function() {
  var randomNumber=Math.floor(Math.random()*10000000000);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if(xhr.responseText==='true'){
          return createChatRoom();
        } else {
           window.location.href = '/newroom/'+randomNumber;
        }
      }
    };
    xhr.open('GET', '/chatroom/'+randomNumber);
    xhr.send();
};
