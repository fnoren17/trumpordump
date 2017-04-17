
trumpOrDumpApp.controller('StartCtrl',function($scope,Trump){
	
	Trump.updateScore(0); //resets the score when entering start view

	$scope.showDiv = function() {
   		document.getElementById('login').style.display = "block";
	}

	$scope.hideDiv= function() {
	  document.getElementById('prelogin').style.display = "none";
	}
	
});