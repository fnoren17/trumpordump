
trumpOrDumpApp.controller('AnswerCtrl',function($scope, $routeParams, Trump, firebase){
	
	
	$scope.showAnswer = "";
	
	if($routeParams.ans == "trump"){
			
		if(Trump.getAnswer() == true){
			firebase.setStatistics("right");
			Trump.updateScore(Trump.getScore() + 1);
			$scope.showAnswer = "Tremendous!";
			$scope.imagePattern = "http://citizensfortrump.com/wp-content/uploads/2015/09/thumbs-up-trump.jpg";
			var audio = new Audio('right.mp3');
			audio.play();
		}else{
			firebase.setStatistics("wrong");
			Trump.updateScore(Trump.getScore() - 5);
			$scope.showAnswer = "Fake News!";
			$scope.imagePattern = "https://i.imgflip.com/14c217.jpg?a414168";
			var audio = new Audio('wrong.mp3');
			audio.play();
		};

		firebase.myHighScore(function(data){
			if(data < Trump.getScore()) {
				firebase.setHighScore(Trump.getScore());
			}
		});
			
	}else{

		if(Trump.getAnswer() == false){
			firebase.setStatistics("right");
			Trump.updateScore(Trump.getScore() + 1);
			$scope.showAnswer = "Tremendous!";
			$scope.imagePattern = "http://citizensfortrump.com/wp-content/uploads/2015/09/thumbs-up-trump.jpg";
			var audio = new Audio('right.mp3');
			audio.play();
		}else{
			firebase.setStatistics("wrong");
			Trump.updateScore(Trump.getScore() - 5);
			$scope.showAnswer = "Fake News!";
			$scope.imagePattern = "https://i.imgflip.com/14c217.jpg?a414168";
			var audio = new Audio('wrong.mp3');
			audio.play();
		};

		firebase.myHighScore(function(data){
			if(data < Trump.getScore()) {
				firebase.setHighScore(Trump.getScore());
			}
		});
	};
});