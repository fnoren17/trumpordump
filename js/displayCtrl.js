
trumpOrDumpApp.controller('DisplayCtrl',function($scope, Trump){
	
	$scope.score = Trump.getScore();
	
});
