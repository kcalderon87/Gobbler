
$(document).ready(function(){

var baseImage = "https://spoonacular.com/recipeImages/"
var counter = 0;
var counter2 = 0;
var counter3 = 0;

function changeLocation(){

   window.location.assign("gobbler_page2.html");
};



$("#searchBtn").on("click",function(){
   var search = $("#search").val()
   console.log(search)

$.ajax({ // begin ajax for food search

         url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=1&offset=5&query=" + search,
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'sx6jftIna4mshjGfZprlulSh7Zdnp1Wp8chjsnIdYQuH4wgaUy');},
         }).done(function(result){
<<<<<<< HEAD
               console.log(result)
               console.log(result.results[0].title + " recipe title")
                     localStorage.setItem("recipeName", JSON.stringify(result));
                     for(var i = 0; i< result.results.length; i++){ // begin for loop to attach id's from results into another AJAX call to get recipe information

=======
               // console.log(result)
               // console.log(result.results[0].title + " recipe title")
                     localStorage.setItem("recipeName", JSON.stringify(result));
                     for(var i = 0; i< result.results.length; i++){ // begin for loop to attach id's from results into another AJAX call to get recipe information
                      console.log(result);
>>>>>>> master
                      var recipeArray =[];
                      var ingredientsArray =[];
         
            $.ajax({ // begin internal ajax call  this gets the recipe instructions

                  url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + result.results[i].id  + "/information",
                  type: "GET",
                  beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'sx6jftIna4mshjGfZprlulSh7Zdnp1Wp8chjsnIdYQuH4wgaUy');},
                  }).done(function(response){
                  counter++;
                  recipeArray.push(response);
                 
<<<<<<< HEAD
                  console.log(counter);
=======
                  // console.log(counter);
>>>>>>> master
                  if (counter === result.results.length) {
                     
                     
                              for(var i = 0; i < recipeArray[0].extendedIngredients.length; i++){ //begin for loop to get ingredients
                              ingredientsArray.push(recipeArray[0].extendedIngredients[i].originalString)
           
                              }// end for loop
<<<<<<< HEAD
                              console.log(ingredientsArray)
=======
                              // console.log(ingredientsArray)
>>>>>>> master
                               localStorage.setItem("ingredientsList", JSON.stringify(ingredientsArray));
                              counter2++;

               if(counter2 === 1){
                          $.ajax({ // begin internal ajax call to get the nutritional value of the recipe, fires after instructions have been collected

                           url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/visualizeNutrition',
                           type: "POST",
                           data: {
<<<<<<< HEAD
                                 defaultCss: false,
=======
                                 defaultCss: true,
>>>>>>> master
                                 ingredientList:ingredientsArray.join("\n")  , // try putting the actual ingredient name in here 
                                 servings: 2
                              },
                           beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'sx6jftIna4mshjGfZprlulSh7Zdnp1Wp8chjsnIdYQuH4wgaUy');},
                           }).done(function(health){
                  
                                 localStorage.setItem("nutrition", JSON.stringify(health));
                                  counter3++ 

                                       if(counter3 === 1){
                                       changeLocation();
<<<<<<< HEAD
                                       console.log(counter3 + "  counter 3")
=======
                                       // console.log(counter3 + "  counter 3")
>>>>>>> master
                                       }                       
                                 }); // end internal ajax call
                           
                        
                            } // end if statement to get nutritional value


                  } // end if statement that gets the ingredients

               
         }); // end internal ajax call


         }
  







});// end big ajax


}); //end click




var page2recipe = JSON.parse(localStorage.getItem("recipeName"));
var page2ingredients = JSON.parse(localStorage.getItem("ingredientsList"))
var page2nutrition = JSON.parse(localStorage.getItem("nutrition"))

<<<<<<< HEAD
console.log(page2recipe);

console.log(page2recipe.results[0].title)
console.log(page2ingredients[1] + 'page 2 ingredients')
console.log(page2nutrition);

var imageContainer = $("<img>");
     imageContainer.addClass("foodPic")
    $(imageContainer).attr("src", baseImage + page2recipe.results[0].image) // adding image to image div
    $("#image").append(imageContainer)
=======
console.log(page2ingredients + "ingredients array");
// console.log(page2nutrition + "nutrition array");




 
 //area where image tag is created to store the image from local memory and put it on the page
var nameOfRecipe = page2recipe.results[0].title
var imageContainer = $("<img>"); 
     imageContainer.addClass("foodPic")
    $(imageContainer).attr("src", baseImage + page2recipe.results[0].image) // adding image to image div
    $("#image").append(imageContainer)
    $("#image").prepend($("<p>" + nameOfRecipe + "<p>"));

// end image area


// area where the ingredients are gathered from local memory, and put into recipe area
var ingredientsContainer = $("<ul>");
    $("#recipe").append(ingredientsContainer);

    for(var i = 0; i < page2ingredients.length; i++) {
      var instructions = page2ingredients[i];
      var listItems = $("<li>");
      listItems.append(instructions);
      ingredientsContainer.append(listItems);

     }
// end recipe area

// area where nutritional information is placed into the nutrition area


    
 $("#nutritionInformation").append(page2nutrition);


>>>>>>> master

});// end doc ready
