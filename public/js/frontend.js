



	 (function($){
        $(window).on("load",function(){
            $("#displayChecklist").mCustomScrollbar({
            	theme: "rounded-dots"
            });
        });
    })(jQuery);


   		 (function($){
        $(window).on("load",function(){
            $("#displayReviews").mCustomScrollbar({
            	theme: "rounded-dots-dark"
            });
        });
    })(jQuery);

      		 (function($){
        $(window).on("load",function(){
            $(".reviewDropDown").mCustomScrollbar({
            	theme: "rounded-dots"
            });
        });
    })(jQuery);

   			 (function($){
        $(window).on("load",function(){
            $(".personalDropDown").mCustomScrollbar({
            	theme: "rounded-dots-dark"
            });
        });
    })(jQuery);

         			 (function($){
        $(window).on("load",function(){
            $("#leaderboardItems").mCustomScrollbar({
            	axis: "x",
            	theme: "rounded-dots-dark"
            	
            });

            console.log("Working?");
        });
    })(jQuery);










$("div.check").on("click", function(event){
	
	$(this).css("background-image", "url(assets/img/checkedBox.png)");
})



    $.fn.stars = function() {
        return $(this).each(function() {

            var rating = $(this).data("rating");

            var numStars = $(this).data("numStars");

            var fullStar = new Array(Math.floor(rating + 1)).join('<i class="fa fa-star"></i>');

            var halfStar = ((rating%1) !== 0) ? '<i class="fa fa-star-half-empty"></i>': '';

            var noStar = new Array(Math.floor(numStars + 1 - rating)).join('<i class="fa fa-star-o"></i>');

            $(this).html(fullStar + halfStar + noStar);

        });
    }

    $('.stars').stars();


var leaderboard = "/api/leaderboard";

$.ajax({
	url: leaderboard,
	method: "GET"
}).done(function(response){

	console.log(response[0].name);

	for(var i = 0; i < response.length; i++);

		
	$("#leaderboardItems").append("<div class='topUser'><h5>" + response[0].name + ":  </h5><p class='badgeCount'>  " + response[0].badges + "</p></div>");
	$("#leaderboardItems").append("<div class='topUser'><h5>" + response[1].name + ":  </h5></div>");
	$("#leaderboardItems").append("<div class='topUser'><h5>" + response[2].name + ":  </h5></div>");
	$("#leaderboardItems").append("<div class='topUser'><h5>" + response[3].name + ":  </h5></div>");
	$("#leaderboardItems").append("<div class='topUser'><h5>" + response[4].name + ":  </h5></div>");

		

	

	

});



 