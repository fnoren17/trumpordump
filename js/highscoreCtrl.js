
trumpOrDumpApp.controller('HighscoreCtrl',function($scope, firebase, Trump,$timeout){

   	

    // GETTING HIGHSCORE
	  firebase.getLiveHighScore(function(snapshot) {

      var highScoreList = [];

      //console.log("YAS QUEEN");
      //console.log(snapshot);
      //console.log(highScoreList);
      var data = JSON.parse(JSON.stringify(snapshot));
      var counter = 0;
      var UserScore = Trump.getScore();
      //console.log("UserScore: ",UserScore);
      //console.log(snapshot);

    for (var thing in data) {
      highScoreList.push(data[thing].highScore);
      if(thing == firebase.me()) {UserScore = data[thing].highScore;}
      counter +=1;
    }

    // SORTING HIGHSCORE
    highScoreList.sort(function(a, b){return b - a});

    // CREATING FUN NAMES FOR HIGHSCORE LIST
    var animals = ["Bison","Trump Supporter","Bald eagle","Orange","Fake news journalist"];
    animals.sort(function(a, b){return 0.5 - Math.random()});

    // SETTING "ANIMALS"
    $scope.firstAnimal = "Anonymous " + animals[0];
    $scope.secondAnimal = "Anonymous " + animals[1];
    $scope.thirdAnimal = "Anonymous " + animals[2];

    // FINDING YOURSELF AND EDITING DATA
    if (UserScore == highScoreList[0]) {
      $scope.firstAnimal = "You got";
    }
    else if (UserScore == highScoreList[1]){
      $scope.secondAnimal = "You got";
    }
    else if (UserScore == highScoreList[2]) {
      $scope.thirdAnimal = "You got";
    }

    // SETTING SCORE
    $scope.firstPoints = highScoreList[0];
    $scope.secondPoints = highScoreList[1];
    $scope.thirdPoints = highScoreList[2];

    $timeout(function() {
      $scope.objects = [{points:$scope.firstPoints, animal:$scope.firstAnimal, number:"1"},{points:$scope.secondPoints, animal:$scope.secondAnimal, number:"2"},{points:$scope.thirdPoints, animal:$scope.thirdAnimal, number:"3"}];
    },100);
    });
});