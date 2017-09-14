
trumpOrDumpApp.controller('DisplayCtrl',function($scope, firebase, Trump){
	
	$scope.score = Trump.getScore();

	$scope.signOut = function(){
		firebase.signOut();
	}

	
});

//Test
