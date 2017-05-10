document.onload = function(){

$(document).ready(function(){
	$("#checklistContainer").slidedown();
});



};



$("div.check").on("click", function(event){
	event.preventDefault();
	$(this).css("background-image", "url(assets/img/checkedBox.png)");
})
