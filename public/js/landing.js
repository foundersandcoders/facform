var currentYear = new Date().getFullYear();
console.log(currentYear);
var footer = document.getElementById('footer');
footer.innerText = footer + " " + currentYear;
