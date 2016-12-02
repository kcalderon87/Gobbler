$(document).ready(function(){

var page2search = localStorage.getItem("searchTerm")

var counter = 0;
var counter2 = 0;
var ingredientsArray = [];
var instructionsArray = [];
var baseImage = "https://spoonacular.com/recipeImages/"

function goBack(){
  localStorage.clear();
   window.location.assign("gobbler.html");

};



$("#newSearch").on("click",function(){

  goBack();

});



$("#searchAgain").on('click',function(){

var rand = Math.floor(Math.random() * 30) + 1;
console.log(rand)

$.ajax({ // begin ajax for food search

         url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=1&offset=" + rand +"&query=" + page2search,
         type: "GET",
         async: false,
         beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'sx6jftIna4mshjGfZprlulSh7Zdnp1Wp8chjsnIdYQuH4wgaUy');},
      }).done(function(result){ 

        console.log(result)
        

        $("#image").empty();

        var newImage =$("<img>");
            newImage.attr("src", baseImage + result.results[0].image);
            newImage.addClass("foodPic");
        $("#image").append(newImage);
        $("#image").prepend("<p>" + result.results[0].title + "<p>");








        
          for(var i = 0; i < result.results.length; i++){
         $.ajax({ // begin ajax for food search
         url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + result.results[i].id + '/analyzedInstructions?stepBreakdown=true',
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'sx6jftIna4mshjGfZprlulSh7Zdnp1Wp8chjsnIdYQuH4wgaUy');},
          }).done(function(instructions){


            console.log(instructions);

          
            // var newUL = $("<ul>")
            // $("#instructionsArea").append(newUL);

            instructionsArray= [];
            for(var t =0; t < instructions[0].steps.length; t++){

  
            instructionsArray.push(instructions[0].steps[t].step);
                   
            }
            $("#instructions2").empty();
            // var newOL = $("<ol>")
            // $("#instructions2").append(newOL)

             if(page2instructions != null){ 
            for( var i = 0; i< instructionsArray.length; i++) {
              var newinstructions = instructionsArray[i];
             $("#instructions2").append("<li>"+ newinstructions+"</li>");  
            }
          }
          else{
                 var noInstructions = $("<p>");
                 noInstructions.html("Gobbler can not find instructions for this recipe");
                 $("##instructions2").append(noInstructions); 
              }

                });// end instrutions ajax
          } //end for

          $.ajax({
            url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + result.results[0].id  + "/information",
            type: "GET",
            async: false,
              beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'sx6jftIna4mshjGfZprlulSh7Zdnp1Wp8chjsnIdYQuH4wgaUy');},
                    }).done(function(ingredients){

                      $("#recipe2").empty();

                      // var newUL = $("<ul>"); 
                        
                      // $("#recipe2").append(newUL);

                      ingredientsArray = [];

                     for(var g = 0; g < ingredients.extendedIngredients.length; g++){

                         ingredientsArray.push(ingredients.extendedIngredients[g].originalString); 
                  
                       }// end for loop for ingredient


                       for(var i = 0; i < ingredientsArray.length; i++){
                            var ingredients2 = ingredientsArray[i];
                            
                            $("#recipe2").append("<li>" + ingredients2 + "<li>") ;
                       }
                       console.log(ingredientsArray)
            
          });

                    $.ajax({
                              url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/visualizeNutrition',
                              type: "POST",
                              async: false,
                              data: {
                                    defaultCss: false,
                                    ingredientList:ingredientsArray.join("\n")  , // try putting the actual ingredient name in here 
                                    servings: 4
                                 },
                              beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'sx6jftIna4mshjGfZprlulSh7Zdnp1Wp8chjsnIdYQuH4wgaUy');},
                              }).done(function(health){

                                console.log(health);
                                $("#nutritionInformation").empty();
                                $("#nutritionInformation").append(health);
                              
                    }); // end visualize nutrition


                  $.ajax({ // begin price ajax
                       url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/visualizePriceEstimator',
                       type: "POST",
                       async: false, 
                       data: {
                                    defaultCss: true,
                                    ingredientList: ingredientsArray.join("\n")  ,
                                    mode: 2,
                                    servings: 1,
                                    showBacklink: true,

                                 },
                      beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'sx6jftIna4mshjGfZprlulSh7Zdnp1Wp8chjsnIdYQuH4wgaUy');},
                              }).done(function(cost){

                                $("#cost").empty();
                                $("#cost").append(cost);
                                
                                $("#spoonacularPriceBreakdownChart").remove();

                  }); // end price ajax


        
      }); // end big ajax done function







}); // end search again


if(localStorage.getItem("ingredientsList") == 'undefined' || localStorage.getItem("ingredientsList") == null)
{
  $("#image").remove();
  $("#recipe-box").remove();
   $("#demo").remove();
   $("#instructionsArea").empty();
    $("#instructionsArea").append("<span>" + "We can't find a recipe for that right now. Please search something different" + "<span>");
}
else{


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
 console.log(page2cost);


// area where the ingredients are gathered from local memory, and put into recipe area

// var ingredientsContainer = $("<ul>");
//     $("#recipe").append(ingredientsContainer);

    for(var i = 0; i < page2ingredients.extendedIngredients.length; i++) {
      var instructions = page2ingredients.extendedIngredients[i].originalString;
      var listItems = $("<li>");
          listItems.addClass("listItems")
      listItems.append(instructions);
      $("#recipe2").append(listItems);


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
   var instructionsContainer = $("<ol>");
    $("#instructions2").append(instructionsContainer);

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
         $("#instructions2").append(noInstructions); 
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
$("#spoonacularPriceBreakdownChart").remove();

}

}); // end doc ready