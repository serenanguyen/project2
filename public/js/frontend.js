document.onload = function(){

$(document).ready(function(){
	$("#checklistContainer").slidedown();
});



};



$("div.check").on("click", function(event){
	// event.preventDefault();
	console.log(event);
	$(this).css("background-image", "url(assets/img/checkedBox.png)");
})
// if monthlyStatus loc = 0 change bg and disable
// .off() removes event handlers
