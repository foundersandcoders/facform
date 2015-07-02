var lightbox = document.getElementById("lightbox");

document.getElementById("start-button").addEventListener('mousedown', function(){
  lightbox.style.display = "inline";
});

// document.getElementById("no-lightbox").addEventListener('mouseup', function(){
//   document.getElementById("lightbox").style.display = "none";
// });

document.getElementById("x").addEventListener('mouseup', function(){
  lightbox.style.display = "none";
  });
