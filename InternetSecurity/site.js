function myFunction() {
  var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}

function switchView (hide, show) {
	document.getElementById(hide).classList.toggle('hidden');
	document.getElementById(show).classList.toggle('hidden');
}
