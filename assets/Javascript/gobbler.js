$('document').ready(function(){



// holds background images
var images=['../Gobbler/assets/images/foodImage1.jpg', 
			  '../Gobbler/assets/images/foodImage2.jpg', 
			  '../Gobbler/assets/images/foodImage3.jpg', 
			  '../Gobbler/assets/images/foodImage4.jpg', 
			  '../Gobbler/assets/images/foodImage5.jpg', 
			  '../Gobbler/assets/images/foodImage6.jpg', 
			  '../Gobbler/assets/images/foodImage7.jpg', 
			  '../Gobbler/assets/images/foodImage8.jpg', 
			  '../Gobbler/assets/images/foodImage9.jpg',
			  '../Gobbler/assets/images/foodImage10.jpg',
			  '../Gobbler/assets/images/foodImage11.jpg',
			  '../Gobbler/assets/images/foodImage12.jpg', 
			  '../Gobbler/assets/images/foodImage13.jpg', 
			  '../Gobbler/assets/images/foodImage14.jpg', 
			  '../Gobbler/assets/images/foodImage15.jpg', 
			  '../Gobbler/assets/images/foodImage16.jpg', 
			  '../Gobbler/assets/images/foodImage17.jpg', 
			  '../Gobbler/assets/images/foodImage18.jpg',
			  '../Gobbler/assets/images/foodImage19.jpg', 
			  '../Gobbler/assets/images/foodImage20.jpg'
			  ];

//--------------HOME PAGE RANDOM BACKGROUND LOOP STARTS-------------------
console.log("-----Backgound ImageLoop at Random-----")

var remIndex;

// The index variable will keep track of which image is currently showing
var index = 0,oldIndex;

$(document).ready(function() {
    
    // Call backstretch for the first time,
    // set speed of for a fadeIn effect between images.
    getNextImage();   
    $.backstretch(images[index], {
        speed: 3000
    });

    // Set an interval that increments the index and sets the new image
    setInterval(function() {
        getNextImage();           
        $.backstretch(images[index]);
    }, 6000);

    // script for preloading all of the images
    $(images).each(function() {
        $("<img/>")[0].src = this;
    });   
});

function getNextImage() {
    if(remIndex == null || remIndex.length == 0) {
       repopulate(); 
    }
    oldIndex = index;
    
    var rInd;
    while (oldIndex == index) {
        rInd = Math.floor((Math.random()*remIndex.length));
        index = remIndex[rInd];
    }
    console.log(index);
    remIndex.splice(rInd,1);    
}

function repopulate() {
    if(remIndex == null) {
       remIndex = new Array(); 
    }
    for(var i = 0; i<images.length; i++) {
        remIndex.push(i);
    }
}
//---------------------END OF HOMEPAGE RANDOM BACKGROUND LOOP------------

}) // document ready 

//---------------------Start of Bing API ------------------
		
	$("#searchBtn").on("click", function (){

		var searchvid = $("#searchvid").val().trim();
		var params = {
	    	
	        "q": searchvid,
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

		
			// $("#videoplayer").html(response.value[0].embedHtml); 
			
 			for(var i =0; i < response.value.length; i++){ // begin loop to get urls
 			$("#videoPlayer").html(response.value[i].embedHtml)
 			}
		});
	});
