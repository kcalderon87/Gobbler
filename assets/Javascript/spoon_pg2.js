$(document).ready(function(){


function goBack(){
  localStorage.clear();
   window.location.assign("gobbler.html");

};


$("#searchAgain").on('click',function(){

  goBack()

});



var page2recipe = JSON.parse(localStorage.getItem("recipeName"));
var page2ingredients =JSON.parse(localStorage.getItem("ingredientsList"));
var page2nutrition = JSON.parse(localStorage.getItem("nutrition"));
var page2instructions = JSON.parse(localStorage.getItem("instructions"));
var page2videos = JSON.parse(localStorage.getItem('videos'));
var page2cost = JSON.parse(localStorage.getItem('costAnalysis'));
var image = page2ingredients.image;


console.log(page2videos);

console.log(page2recipe);
console.log(page2ingredients.extendedIngredients);

 console.log(page2instructions);


// area where the ingredients are gathered from local memory, and put into recipe area

var ingredientsContainer = $("<ul>");
    $("#recipe").append(ingredientsContainer);

    for(var i = 0; i < page2ingredients.extendedIngredients.length; i++) {
      var instructions = page2ingredients.extendedIngredients[i].originalString;
      var listItems = $("<li>");
      listItems.append(instructions);
      ingredientsContainer.append(listItems);


     }
// end recipe area

 
//  //area where image tag is created to store the image from local memory and put it on the page
var nameOfRecipe = page2recipe[0].title
var imageContainer = $("<img>"); 
     imageContainer.addClass("foodPic")
      imageContainer.attr("src", image) // adding image to image div
    $("#image").append(imageContainer)
    $("#image").prepend($("<p>" + nameOfRecipe + "<p>"));

// // end image area

// // area where instructions are gathered from local memory and put into instructions
if(page2instructions != null){
	 var instructionsContainer = $("<ul>");
    $("#instructionsArea").append(instructionsContainer);

    for(var i = 0; i < page2instructions.length; i++) {
      var directions = page2instructions[i];
      var directionItems = $("<li>");
      directionItems.append(directions);
      instructionsContainer.append(directionItems);
      // console.log(directions)
     } // end instructions area

}
else{

	   var noInstructions = $("<p>");
	   	   noInstructions.html("Gobbler can not find instructions for this recipe");
	   	   $("#instructionsArea").append(noInstructions); 
}




// area where nutritional information is placed into the nutrition area

 $("#nutritionInformation").append(page2nutrition);

// for(var l = 0; l < page2videos.length; l++){
  //  $("#videoPlayer").append(page2videos[0].embedHtml)
  // $("#videoPlayer").append(page2videos[1].embedHtml)


// }// end attaching videos

for (var i = 0; i < page2videos.length; i++) {
  
  
  $("#videoPlayer").append(page2videos[i].embedHtml.replace("?autoplay=1", ""))
  console.log(page2videos[i].embedHtml.replace("?autoplay=1", ""))

}

// attach cost analysis

$("#cost").append(page2cost);

}); // end doc ready