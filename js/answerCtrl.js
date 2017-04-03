
trumpOrDumpApp.controller('AnswerCtrl',function($scope, $routeParams, Trump){
	
	
	$scope.showAnswer = "";
	
	if($routeParams.ans == "trump"){
			
			if(Trump.getAnswer() == true){
				
				Trump.updateScore(Trump.getScore() + 1);
				$scope.showAnswer = "Tremendous!";
				$scope.imagePattern = "http://citizensfortrump.com/wp-content/uploads/2015/09/thumbs-up-trump.jpg";
			}else{
			
			Trump.updateScore(Trump.getScore() - 5);
			$scope.showAnswer = "Fake News!";
			$scope.imagePattern = "https://i.imgflip.com/14c217.jpg?a414168";
			var audio = new Audio('wrong.mp3');
			audio.play();
			};
			
		}else{
			
			if(Trump.getAnswer() == false){
				
				Trump.updateScore(Trump.getScore() + 1);
				$scope.showAnswer = "Tremendous!";
				$scope.imagePattern = "http://citizensfortrump.com/wp-content/uploads/2015/09/thumbs-up-trump.jpg";
			}else{
			
			Trump.updateScore(Trump.getScore() - 5);
			$scope.showAnswer = "Fake News!";
			$scope.imagePattern = "https://i.imgflip.com/14c217.jpg?a414168";
			var audio = new Audio('wrong.mp3');
			audio.play();
			};
	
		};
	
	
});