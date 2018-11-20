var filters = [];

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
	db.once('value').then(function(list) { // Get value of shelters dataset
	    list.forEach(function(info) { // Loop through each shelter
	        var shelter = info.val();
			
			var li = document.createElement("li");
			var a = document.createElement("a");
			var text = document.createTextNode(shelter.name);
			a.appendChild(text);
			li.appendChild(a);
			$("#shelterNames")[0].appendChild(li); // Add the name of a shelter fromt the dataset to the visible list
	 	});
	});
};

function filterShelterList(attribute, isChecked) {
    db.once('value').then(function(list) { // Get value of shelters dataset
	    var li = $("#shelterNames")[0].getElementsByTagName("li");
		var i = 0;
	    list.forEach(function(info) { // Loop through all shelters, and hide those who don't match the search query
            var shelter = info.val();

			console.log("checked:" +isChecked);
			if (isChecked) {
				console.log("attribute: "+shelter[attribute]);
				li[i].style.display = shelter[attribute] ? "block" : "none"; // shelters with desired attribute are shown
			}
			else {
				// display type should stay the same if shelter had an attribute that was unchecked
				if (!shelter[attribute]) {
					li[i].style.display = filters.every(function(checkedItem) { // Returns true if every checked filter is true of the given shelter
						console.log(checkedItem);
						return shelter[checkedItem];
					}) ? "block" : "none";
				}
			}
			++i; // Increase the index of the shelter
        });
	});
};

createShelterList();

$(':checkbox').change(function(){
    var search_item = $(this)[0].value;
    if($(this).is(':checked')) {
    	filters.push(search_item); // Add filtered item to list
        filterShelterList(search_item, true);
    } else {
        for (var i = filters.length-1; i>=0; i--) { // Remove item from fiter list
		    if (filters[i] === search_item) {
		        filters.splice(i, 1); 
		    }
		}
        filterShelterList(search_item, false);
    }
});