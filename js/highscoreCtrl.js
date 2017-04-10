
trumpOrDumpApp.controller('HighscoreCtrl',function($scope, firebase, Trump){

   	var highScoreList = [];

	  firebase.getDatabase('users',function(snapshot) {

      var data = JSON.parse(JSON.stringify(snapshot));
      var counter = 0;
      var UserScore = Trump.getScore();
      console.log("UserScore: ",UserScore);
    for (var thing in data) {
          highScoreList.push(data[thing].highScore);
          if(thing == firebase.me()) {UserScore = data[thing].highScore;}
          counter +=1;
        }
        highScoreList.sort(function(a, b){return b - a});

        var animals = ["Bison","Trump Supporter","Bald eagle","Orange","Fake news journalist"];
        animals.sort(function(a, b){return 0.5 - Math.random()});

        $scope.$apply(function () {
          $scope.firstAnimal = "Anonymous " + animals[0];
        $scope.secondAnimal = "Anonymous " + animals[1];
        $scope.thirdAnimal = "Anonymous " + animals[2];
          if (UserScore == highScoreList[0]) {
            $scope.firstAnimal = "You got";
          }
          else if (UserScore == highScoreList[1]){
            $scope.secondAnimal = "You got";
          }
          else if (UserScore == highScoreList[2]) {
            $scope.thirdAnimal = "You got";
          }

        $scope.firstPoints = highScoreList[0];
        $scope.secondPoints = highScoreList[1];
        $scope.thirdPoints = highScoreList[2];
        });
    });
});