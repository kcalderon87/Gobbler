$(document).ready(function(){

var counter = 0;
var counter2 = 0;
var ingredientsArray = [];
var instructionsArray = [];
var baseImage = "https://spoonacular.com/recipeImages/"


function changeLocation(){

   window.location.assign("gobbler_page2.html");
}; 

function goBack(){
  localStorage.clear();
   window.location.assign("gobbler.html");

};



$("#searchBtn").on("click",function(){
    var search = $("#search").val()


console.log(search)

var counter = 0;
$.ajax({ // begin ajax for food search

         url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=1&offset=5&query=" + search,
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'sx6jftIna4mshjGfZprlulSh7Zdnp1Wp8chjsnIdYQuH4wgaUy');},
      }).done(function(result){
        console.log(result)
         localStorage.setItem("recipeName", JSON.stringify(result.results));
         
         counter++

      if(counter === 1){
         
         for(var i = 0; i < result.results.length; i++){
         $.ajax({ // begin ajax for food search
         url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + result.results[i].id + '/analyzedInstructions?stepBreakdown=true',
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'sx6jftIna4mshjGfZprlulSh7Zdnp1Wp8chjsnIdYQuH4wgaUy');},
          }).done(function(instructions){


         
             console.log(instructions);
            for(var t =0; t < instructions[0].steps.length; t++){

                instructionsArray.push(instructions[0].steps[t].step);
            }
              console.log(instructionsArray)
            localStorage.setItem("instructions", JSON.stringify(instructionsArray));

     



          

          });// end instrutions ajax
          } //end for


      for(var i = 0; i < result.results.length; i++){ // begin for loop

                  $.ajax({
                     url:"https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + result.results[i].id  + "/information",
                     type: "GET",
                      beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'sx6jftIna4mshjGfZprlulSh7Zdnp1Wp8chjsnIdYQuH4wgaUy');},
                    }).done(function(ingredients){
                     console.log(ingredients)
                    
                      for(var g = 0; g < ingredients.extendedIngredients.length; g++){

                      ingredientsArray.push(ingredients.extendedIngredients[g].originalString); 
                    

                       }// end for loop for ingredients

                       console.log(ingredientsArray) 
                       localStorage.setItem("ingredientsList", JSON.stringify(ingredients));
                       localStorage.setItem("picture",JSON.stringify(ingredients.image));
                            $.ajax({ // begin internal ajax call for nutrition

                              url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/visualizeNutrition',
                              type: "POST",
                              data: {
                                    defaultCss: false,
                                    ingredientList:ingredientsArray.join("\n")  , // try putting the actual ingredient name in here 
                                    servings: 4
                                 },
                              beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'sx6jftIna4mshjGfZprlulSh7Zdnp1Wp8chjsnIdYQuH4wgaUy');},
                              }).done(function(health){
                                 
                              console.log(ingredientsArray[1] + " ingredients")
                              console.log(health);

                              localStorage.setItem("nutrition",JSON.stringify(health))
                              // changeLocation()
                        }); // end internal ajax call for nutrition
                      }); //end of ajax for ingredients

                     
            
                    

                    
 
          }// end for loop for ingredients


      } // end if


  });// end big ajax

      
// 
}); //end click





});// end doc ready
