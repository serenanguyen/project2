document.onload = function(){

$(document).ready(function(){
	$("#checklistContainer").slidedown();
});



};



$("div.check").on("click", function(event){
	
	$(this).css("background-image", "url(assets/img/checkedBox.png)");
})
