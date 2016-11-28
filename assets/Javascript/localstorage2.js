var toDoNotes = 0;
var RECENT_NOTES_DATA_KEY = "recentNotes";

$("#addtoDoNotes").on("click", function(){
    var toDoValue = $("#notes-added").val();
    var item = $("<p>");
    item.attr("id", "item-" + toDoNotes);
    item.text(toDoValue);
    
    // 1. Check if localStorage contains a value for our defined key (recentNotes)
    var items = localStorage.getItem(window.RECENT_NOTES_DATA_KEY);
    console.log("items: " + items);
    if (items == null) {
    	console.log("Let's init our array");
    	items = [];
    } else {
		// 2. If we found something for our key, we must remember that the value is a JSON serialized string.
		// In order to manipulate it, we must transform it back to JS array object
		console.log("Before deserialization: " + typeof(items));
		try {
			items = JSON.parse(items);
		} catch (e) {
			// Damn, it seems that there already is a string but not a correct JSON structure.
			items = [];
		}
		console.log("After deserialization: " + typeof(items));
    
    }

    // 3. If items is correctly deserialized, then handle the addition
    // Then overwrite value in localStorage
    if ($.isArray(items)) {
    	console.log("Items is an array :)");
    	items[items.length] = toDoValue;
    	localStorage.setItem(window.RECENT_NOTES_DATA_KEY, JSON.stringify(items));
    } else {
    	console.log("Problem ! Items is not an array :(");
    }
    
    
    var btn = $("<button>");
    btn.attr("id", "btn-" + toDoNotes);
    btn.attr("data-notesadd", toDoNotes);
    btn.addClass("checkbox");
    btn.text("x");
    // function remove todo
    btn.on("click", function() {
        var todoNumber = $(this).data("notesadd");
        $('#item-' + todoNumber).remove();
    })
    
	item.prepend(btn);
	$("#notes").append(item);
	$('#notes-added').val("");
	toDoNotes++;

	return false;
});