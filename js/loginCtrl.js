
trumpOrDumpApp.controller('LoginCtrl',function($scope, firebase){
	
	// Input for email and password
	$scope.user = {email:"", password:""};

	// New user
	$scope.newAccount = function() {
	 firebase.newAccount($scope.user.email,$scope.user.password);
   	}

   	// Log in
	$scope.login = function() {
		firebase.login($scope.user.email,$scope.user.password);
	}

});