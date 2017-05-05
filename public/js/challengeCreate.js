var locIdArray = [];
$(document).on("click",".addToChallenge",function(){
	console.log($(this).attr("data-name"));
	if(locIdArray.length < 10){
		locIdArray.push($(this).attr("data"));
		switch (locIdArray.length){
			case 1:
				$("#loc1").html($(this).attr("data-name"));
				break;
			case 2:
				$("#loc2").html($(this).attr("data-name"));
				break;
			case 3:
				$("#loc3").html($(this).attr("data-name"));
				break;	
			case 4:
				$("#loc4").html($(this).attr("data-name"));
				break;	
			case 5:
				$("#loc5").html($(this).attr("data-name"));
				break;
			case 6:
				$("#loc6").html($(this).attr("data-name"));
				break;
			case 7:
				$("#loc7").html($(this).attr("data-name"));
				break;
			case 8:
				$("#loc8").html($(this).attr("data-name"));
				break;
			case 9:
				$("#loc9").html($(this).attr("data-name"));
				break;
			case 10:
				$("#loc10").html($(this).attr("data-name"));
				break;					
		}

	};
});
$("#createChallenge").on("click", function(){
	var newChallenge = {
		name: $("#challengeName").val().trim(),
		location1Id: locIdArray[0],
		location2Id: locIdArray[1],
		location3Id: locIdArray[2],
		location4Id: locIdArray[3],
		location5Id: locIdArray[4],
		location6Id: locIdArray[5],
		location7Id: locIdArray[6],
		location8Id: locIdArray[7],
		location9Id: locIdArray[8],
		location10Id: locIdArray[9]
	}
	$.post("/challenge/create",newChallenge)
	.then(function(){
		console.log(newChallenge);
	});
});

