
// Import Admin SDK
var admin = require("firebase-admin");

// Get a database reference to our posts
var db = admin.database();

function searchByName() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = document.getElementById("nameSearch");
    filter = input.value.toUpperCase();
    ul = document.getElementById("shelterNames");
    li = ul.getElementsByTagName("li");

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "block";
        } else {
            li[i].style.display = "none";
        }
    }
};

function createShelterList() {
	db.forEach(function(shelter) {
		var li = document.createElement("li");
		var a = document.createElement("a");
		var text = document.createTextNode(shelter);
		a.appendChild(text);
  		li.appendChild(a);
		$("#shelterNames").appendChild(li);
	});
};

createShelterList();