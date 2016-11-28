
$(document).ready(function(){

	var videoArray =[];

		
	$("#searchBtn").on("click", function (){

		var searchvid = $("#search").val().trim();
		var params = {
	    	
	        "q": searchvid + " recipes",
	        "count": "3",
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
 		// 	$("#vid2").html(response.value[1].embedHtml);
 		// 	$("#vid3").html(response.value[2].embedHtml);
 		// 	$("#vid4").html(response.value[3].embedHtml);
 			
			});
		});
	});