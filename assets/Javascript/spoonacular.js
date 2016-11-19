
$(document).ready(function(){

var search = prompt("enter food");
var counter = 0;
var counter2 = 0;

console.log(search)

$("#test").on("click",function(){

$.ajax({ // begin ajax for food search

         url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=1&offset=5&query=" + search,
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'sx6jftIna4mshjGfZprlulSh7Zdnp1Wp8chjsnIdYQuH4wgaUy');},
      }).done(function(result){
         console.log(result)
         console.log(result.results[0].title + " recipe title")

         for(var i = 0; i< result.results.length; i++){ // begin for loop to attach id's from results into another AJAX call to get recipe information

            var recipeArray =[];
             var ingredientsArray =[];
         
            $.ajax({ // begin internal ajax call

               url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + result.results[i].id  + "/information",
               type: "GET",
               beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'sx6jftIna4mshjGfZprlulSh7Zdnp1Wp8chjsnIdYQuH4wgaUy');},
               }).done(function(response){
                  counter++;
                  recipeArray.push(response);
                  console.log(counter);
                  if (counter === result.results.length) {
                     
                     
                     for(var i = 0; i < recipeArray[0].extendedIngredients.length; i++){ //begin for loop to get ingredients
                     ingredientsArray.push(recipeArray[0].extendedIngredients[i].originalString)
  
                     }// end for loop
                     console.log(ingredientsArray)
                     counter2++;

               if(counter2 === 1){
                    $.ajax({ // begin internal ajax call

               url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/visualizeNutrition',
               type: "POST",
               data: {
                     defaultCss: false,
                     ingredientList:ingredientsArray.join("\n")  , // try putting the actual ingredient name in here 
                     servings: 2
                  },
               beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'sx6jftIna4mshjGfZprlulSh7Zdnp1Wp8chjsnIdYQuH4wgaUy');},
               }).done(function(health){
                  
               console.log(ingredientsArray[9] + " ingredients")
               console.log(health);
         }); // end internal ajax call

          }
                  }
               
         }); // end internal ajax call


         }// end for loop
  

console.log(counter2);




  
});// end big ajax


// ingredientsArray.join("\n") 

}); //end click




});// end doc ready
