
trumpOrDumpApp.controller('StartCtrl',function($scope,Trump){
	
	Trump.updateScore(0); //resets the score when entering start view
	$scope.loginHider = true;
	$scope.showDiv = function() {
   		$scope.loginHider = false;
	}
});