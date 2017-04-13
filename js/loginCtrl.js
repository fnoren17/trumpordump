
trumpOrDumpApp.controller('LoginCtrl',function($scope, firebase){
	
	$scope.user = {email:"test@test.se", password:"testing"};

	$scope.newAccount = function() {
	 firebase.newAccount($scope.user.email,$scope.user.password);
   }

	$scope.login = function() {
		firebase.login($scope.user.email,$scope.user.password);
    console.log(window.location);
	}

});