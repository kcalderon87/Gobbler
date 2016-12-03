$(document).ready(function(){

var counter = 0;
var counter2 = 0;
var ingredientsArray = [];
var instructionsArray = [];
var baseImage = "https://spoonacular.com/recipeImages/"
var rand = Math.floor(Math.random() * 30) + 1;

function changeLocation(){

   window.location.assign("gobbler_page2.html");
}; 

function goBack(){
  localStorage.clear();
   window.location.assign("gobbler.html");

};


$('#page2').on('keyup keypress', function(e) {
 var keyCode = e.keyCode || e.which;
 if (keyCode === 13) { 
   e.preventDefault();
   return false;
 }
});

$("#searchBtn").on("click",function(){
    var search = $("#search").val()
    localStorage.setItem("searchTerm", search)

console.log(search)

var counter = 0;
$.ajax({ // begin ajax for food search

         url: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=1&offset="+ rand +"&query=" + search,
         type: "GET",
         async: false,
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
                     async: false,
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
                                 
                              // console.log(ingredientsArray[1] + " ingredients")
                              // console.log(health);

                              localStorage.setItem("nutrition",JSON.stringify(health))
                           
                        }); // end internal ajax call for nutrition

                               $.ajax({ // begin internal ajax call for price

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
                              beforeSend: function(xhr){xhr.setRequestHeader('X-Mashape-Key', 'sx6jftIna4mshjGfZprlulSh7Zdnp1Wp8chjsnIdYQuH4wgaUy')
                                                        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');},
                              }).done(function(cost){
                                 
                              // console.log(ingredientsArray[1] + " ingredients")
                              localStorage.setItem("costAnalysis", JSON.stringify(cost));

                          
                              // 
                        }); // end internal ajax call for nutrition


                      }); //end of ajax for ingredients

                     
            
                    

                    
 
          }// end for loop for ingredients


      } // end if


  });// end big ajax

  var videoArray =[];


    var searchvid = $("#search").val().trim();
    var params = {
        
          "q": searchvid + " recipes",
          "count": "4",
          "offset": "0",
          "mkt": "en-us",
          "safeSearch": "Moderate",
      };

    var apikey = "02d1abde8b6f4aac833e43e0a6626d91";
    var url = "https://api.cognitive.microsoft.com/bing/v5.0/videos/search?"+ $.param(params);

    // create error if search is empty 
    
    $.ajax({
      url: url,
      method: 'GET',
      beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apikey);
            }
    })
      .done(function(response) {
      console.log(response)
      for(var i = 0; i < response.value.length; i++){
          videoArray.push(response.value[i])

      }
      localStorage.setItem('videos', JSON.stringify(videoArray));

      console.log(videoArray)
      // $("#videoplayer").html(response.value[0].embedHtml); 
      // $("#vid1").html(response.value[0].embedHtml);
    //  $("#vid2").html(response.value[1].embedHtml);
    //  $("#vid3").html(response.value[2].embedHtml);
    //  $("#vid4").html(response.value[3].embedHtml);
      changeLocation()
      });
      
// 
}); //end click





});// end doc ready
