
trumpOrDumpApp.controller('QuestionCtrl',function($scope, Trump){
	
	//var question = "I have to tell you..."; //loading message
	
	$scope.getQuestion = Trump.getTweet();
	
	
});