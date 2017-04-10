/*
  0. Gettin data for all users:
    var reference = firebase.database().ref('users');
    reference.on('value', function(snapshot) {
      //Save variable using this: = JSON.parse(JSON.stringify(snapshot));
    });
  
  1. Getting data for user: 
    var userId = firebase.auth().currentUser.uid; 
    var reference = firebase.database().ref('users/' + userId);
    reference.on('value', function(snapshot) {
      //Save variable using this: = JSON.parse(JSON.stringify(snapshot));
    });
  
  2. Setting data for user: (will write over data so be careful)
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + userId).set(JSONDATA); // change JSONDATA to whatever variable you use.
  
  3. Getting all tweets:
    firebase.database().ref('tweets').on('value', function(snapshot) {
      //Save variable using this: JSON.parse(JSON.stringify(snapshot));
    });
  
  4. Adding or modifying a tweet and score for it:
    var strVal = '{ "numberRight": 0,"numberWrong": 0,"totalNumber": 0}'; // if no guesses so far. Read data and change it for each guess.
    firebase.database().ref('tweets/' + TWEETTEXT).set(JSON.parse(strVal)); // change TWEETTEXT to the text of the real or fake tweet and remove any dots (.)
  
  5, Gettin a tweet:
    var reference = firebase.database().ref('tweets/' + TWEETTEXT);
    reference.on('value', function(snapshot) {
      //Save variable using this: = JSON.parse(JSON.stringify(snapshot));
    });

*/

trumpOrDumpApp.controller('LoginCtrl',function($scope, firebase){
	
	$scope.user = {email:"felixnor@kth.se", password:"testingtesting"};

	$scope.newAccount = function() {
	 firebase.newAccount($scope.user.email,$scope.user.password);
   //console.log("created new acc with UN ", $scope.user.email, "and PW", $scope.user.password)
  }

	$scope.login = function() {
		firebase.login($scope.user.email,$scope.user.password);
    console.log(window.location);
	}

});