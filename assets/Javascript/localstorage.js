var toDoNotes = 0;

$("#addtoDoNotes").on("click", function(){
	var toDoValue = $("#notes-added").val();
	var item = $("<p>");
	item.attr("id", "item-" + toDoNotes);
	item.text(toDoValue);	
	localStorage.setItem("recentNotes", toDoValue);
	//console.log(toDoValue)
	localStorage.getItem("recentNotes", toDoValue);

	var btn = $("<button>");
	btn.attr("id", "btn-" + toDoNotes);
	btn.attr("data-notesadd", toDoNotes);
	btn.addClass("checkbox");
	btn.text("x");

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