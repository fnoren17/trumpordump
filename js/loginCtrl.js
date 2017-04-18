
trumpOrDumpApp.controller('LoginCtrl',function($scope, firebase){
	
	//TODO fixa så att om det blir login, error så går du inte till nästa sida.

	// Input for email and password
	$scope.user = {email:"", password:""};


	// New user
	$scope.newAccount = function() {
	 	firebase.newAccount($scope.user.email,$scope.user.password);
   		//setTimeout(function() {window.location.href = "#/question";}, 2000);
   	}

   	// Log in
	$scope.login = function() {
		firebase.login($scope.user.email,$scope.user.password);
		//setTimeout(function() {window.location.href = "#/question";}, 2000);	  
	}

});