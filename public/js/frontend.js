document.onload = function(){

$(document).ready(function(){
	$("#checklistContainer").slidedown();
});




};

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




$("div.check").on("click", function(event){
	// event.preventDefault();
	console.log(event);
	$(this).css("background-image", "url(assets/img/checkedBox.png)");
})
// if monthlyStatus loc = 0 change bg and disable
// .off() removes event handlers
