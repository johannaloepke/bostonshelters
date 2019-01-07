var FILTERS = [];

// based on search query text, filter out the items that don't match
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

// gets initial list of all the shelters in DB
function createShelterList() {
	DB.once('value').then(function(list) { // Get value of shelters dataset
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

// based on checkboxes, filter out the items that don't have the desired attribute
function filterShelterList(attribute, isChecked) {
    DB.once('value').then(function(list) { // Get value of shelters dataset
	    var li = $("#shelterNames")[0].getElementsByTagName("li");
		var i = 0;
	    list.forEach(function(info) { // Loop through all shelters, and hide those who don't match the search query
            var shelter = info.val();

			if (isChecked) {
				// if shelter has certain checked attribute, show it, otherwise hide
				li[i].style.display = shelter[attribute] ? "block" : "none";
				// trigger hiding or showing marker
				showOrHide(li[i].style.display, shelter.name);
			}
			else {
				// display type should stay the same if shelter had an attribute that was unchecked
				if (!shelter[attribute]) {
					li[i].style.display = FILTERS.every(function(checkedItem) { // Returns true if every checked filter is true of the given shelter
						return shelter[checkedItem];
					}) ? "block" : "none";
					// trigger hiding or showing marker
					showOrHide(li[i].style.display, shelter.name);
				}
			}
			++i; // Increase the index of the shelter
        });
	});
};

// triggers an event to either show or hide map marker
function showOrHide(displayType, shelterName) {
	var event = new CustomEvent(displayType == "block" ? "showMarker" : "hideMarker", { "detail": shelterName });
	document.dispatchEvent(event);
}

createShelterList();

$(':checkbox').change(function(){
    var search_item = $(this)[0].value;
    if($(this).is(':checked')) {
    	FILTERS.push(search_item); // Add filtered item to list
        filterShelterList(search_item, true);
    } 
    else {
        for (var i = FILTERS.length-1; i>=0; i--) { // Remove item from fiter list
		    if (FILTERS[i] === search_item) {
		        FILTERS.splice(i, 1); 
		    }
		}
        filterShelterList(search_item, false);
    }
});