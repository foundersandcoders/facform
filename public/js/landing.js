document.getElementById("start-button").addEventListener('mousedown', function(){
  document.getElementById("lightbox").style.display = "inline";
});
var lightbox = document.getElementById("lightbox");
// document.getElementById("no-lightbox").addEventListener('mouseup', function(){
//   document.getElementById("lightbox").style.display = "none";
// });

// document.getElementById("x").addEventListener('mouseup', function(){
//   document.getElementById("lightbox").style.display = "none";
// });

document.body.onclick = function(){
  if(lightbox.style.display === "none"){
    document.getElementById("lightbox").style.display="none";
  }

};
