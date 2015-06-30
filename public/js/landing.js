var currentYear = new Date().getFullYear();
console.log(currentYear);
var footer = document.getElementById('footer').value;
footer.innerText = footer + " " + currentYear;
