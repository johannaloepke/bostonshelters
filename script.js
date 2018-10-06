// Initialize Firebase
var config = {
    apiKey: "AIzaSyDod66YZbbge66UKTTtOa69gOMIL1LXNxM",
    authDomain: "bostonshelters.firebaseapp.com",
    databaseURL: "https://bostonshelters.firebaseio.com",
    projectId: "bostonshelters",
    storageBucket: "bostonshelters.appspot.com",
    messagingSenderId: "414085520378"
};
firebase.initializeApp(config);

// Import database
var db = firebase.database();

function searchByName() {
    // Declare variables
    var input, filter, ul, li, a, i;
    input = $("#nameSearch")[0];
    filter = input.value.toUpperCase();
    ul = $("#shelterNames")[0];
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
	db.ref('shelters/').once('value').then(function(list) {
    list.forEach(function(info) {
        var shelter = info.val();
		
		var li = document.createElement("li");
		var a = document.createElement("a");
		var text = document.createTextNode(shelter.name);
		a.appendChild(text);
		li.appendChild(a);
		$("#shelterNames")[0].appendChild(li);
	    });
	});
};

function filterShelterList(attribute) {
    db.ref('shelters/').once('value').then(function(list) {
        list.forEach(function(info) {
            var shelter = info.val();
            
            if(!shelter.attribute) {
                
            }
            
            var li = document.createElement("li");
            var a = document.createElement("a");
            var text = document.createTextNode(shelter.name);
            a.appendChild(text);
		li.appendChild(a);
		$("#shelterNames")[0].appendChild(li);
	    });
	});
};


createShelterList();
filterShelterList();