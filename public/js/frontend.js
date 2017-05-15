(function($) {
  $(window).on("load", function() {
    $("#displayChecklist").mCustomScrollbar({theme: "rounded-dots"});
  });
})(jQuery);

(function($) {
  $(window).on("load", function() {
    $("#displayReviews").mCustomScrollbar({theme: "rounded-dots-dark"});
  });
})(jQuery);

(function($) {
  $(window).on("load", function() {
    $(".reviewDropDown").mCustomScrollbar({theme: "rounded-dots"});
  });
})(jQuery);

(function($) {
  $(window).on("load", function() {
    $(".personalDropDown").mCustomScrollbar({theme: "rounded-dots-dark"});
  });
})(jQuery);

$("div.check").on("click", function(event) {

  $(this).css("background-image", "url(assets/img/checkedBox.png)");
})

$.fn.stars = function() {
  return $(this).each(function() {

    var rating = $(this).data("rating");

    var numStars = $(this).data("numStars");

    var fullStar = new Array(Math.floor(rating + 1)).join('<i class="fa fa-star"></i>');

    var halfStar = ((rating % 1) !== 0)
      ? '<i class="fa fa-star-half-empty"></i>'
      : '';

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


  $("#leaderboardItems").append("<div class='topUser'><p>1. " + response[0].name + ":  " + response[0].badgesCount + " completed</p></div>");
 $("#leaderboardItems").append("<div class='topUser'><p>2. " + response[1].name + ":  " + response[1].badgesCount + " completed</p></div>");
 $("#leaderboardItems").append("<div class='topUser'><p>3. " + response[2].name + ":  " + response[2].badgesCount + " completed</p></div>");
 $("#leaderboardItems").append("<div class='topUser'><p>4. " + response[3].name + ":  " + response[3].badgesCount + " completed</p></div>");
 $("#leaderboardItems").append("<div class='topUser'><p>5. " + response[4].name + ":  " + response[4].badgesCount + " completed</p></div>");


});
