$('document').ready(function(){
//console.log("start menu")

// holds background images
var imgArray=['../Gobbler/assets/images/foodImage1.jpg', 
			  '../Gobbler/assets/images/foodImage2.jpg', 
			  '../Gobbler/assets/images/foodImage3.jpg', 
			  '../Gobbler/assets/images/foodImage4.jpg', 
			  '../Gobbler/assets/images/foodImage5.jpg', 
			  '../Gobbler/assets/images/foodImage6.jpg', 
			  '../Gobbler/assets/images/foodImage7.jpg', 
			  '../Gobbler/assets/images/foodImage8.jpg', 
			  '../Gobbler/assets/images/foodImage10.jpg'
			  ];

console.log("yummy food: " + imgArray[4])

//random number generator for images in background
var i = Math.floor(imgArray.length * Math.random())

//holds the value assigned to background image
var imageBackground = 'url(' + imgArray[i] + ')';

console.log(imageBackground)

//when the page loads perform css functions
$('body').css({
	"background-image": imageBackground,
	"background-repeat": "no-repeat",
	"background-size": "100%"
})

$.backstretch([
      		  '../Gobbler/assets/images/foodImage1.jpg', 
			  '../Gobbler/assets/images/foodImage2.jpg', 
			  '../Gobbler/assets/images/foodImage3.jpg', 
			  '../Gobbler/assets/images/foodImage4.jpg', 
			  '../Gobbler/assets/images/foodImage5.jpg', 
			  '../Gobbler/assets/images/foodImage6.jpg', 
			  '../Gobbler/assets/images/foodImage7.jpg', 
			  '../Gobbler/assets/images/foodImage8.jpg', 
			  '../Gobbler/assets/images/foodImage10.jpg'
  ], {duration: 3000, fade: 750});
console.log("backstretch " + backstretch)



//-----------------------------------------------------------

// function loopingImages() {

// 	var loopedImg = $('body');
// 	var newImage = $('<img>');

// //for loop to get images to loop when on page
// for(var i=0; i < imgArray.length; i++){

// 	loopedImg.append( 'img' + imgArray[i]);
    
//     console.log("foodie" + imgArray[i]);
// 	}

// };


//window.onload = function () {setInterval(loopingImages, 10000)};

 















}) // document ready 