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
	
	$scope.user = {email:"perjaa@kth.se", password:"testingtesting"};

	var user;
	var fireAuth = firebase.auth();

  $scope.reset = function() {
      $scope.user = {email:"", password:""};
  };

	$scope.newAccount = function() {
		user = firebase.auth().createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
    	.catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		if (errorCode == 'auth/weak-password') {
    		alert('The password is too weak.');
  		} else {
    		alert(errorMessage);
  		}
  		console.log(error);
		});
  }

	$scope.login = function() {
		user = firebase.auth().signInWithEmailAndPassword($scope.user.email, $scope.user.password)
    	.catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		if (errorCode === 'auth/wrong-password') {
    		alert('Wrong password.');
  		} else {
    		alert(errorMessage);
  		}
  		console.log(error);
		});
	}

  $scope.resetUserData = function() {
    // Sets user data to default 0 values.
    var userId = firebase.auth().currentUser.uid; 
    firebase.database().ref('users/' + userId).set({highScore: 0,tweetsSeen: {"0": true}});
  
    var reference = firebase.database().ref('users/' + userId);
    reference.on('value', function(snapshot) {
      console.log(JSON.stringify(snapshot));
    });
  }

  $scope.showUserData = function() {
    // Gives user data for current user, if there is any yet.
    var userId = firebase.auth().currentUser.uid;
    var reference = firebase.database().ref('users/' + userId);
    reference.on('value', function(snapshot) {
      console.log(JSON.stringify(snapshot));
    });
  }

});