
trumpOrDumpApp.controller('StartCtrl',function($scope,Trump){
	
	Trump.updateScore(0); //resets the score when entering start view
	function showDiv() {
   document.getElementById('welcomeDiv').style.display = "block";
}
	
});