var createSession = function() {
  var randomNumber=Math.floor(Math.random()*10000000000);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if(xhr.responseText==='true'){
          return createChatRoom();
        } else {
           window.location.href = '/createsession/'+randomNumber;
        }
      }
    };
    xhr.open('GET', '/checkroom/'+randomNumber);
    xhr.send();
};
