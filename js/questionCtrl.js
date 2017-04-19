
trumpOrDumpApp.controller('QuestionCtrl',function($scope, Trump){
	
	//var question = "I have to tell you..."; //loading message
	
	$scope.getQuestion = Trump.getTweet();

	$scope.listTweet = {title: 'thisAnswer'};
	$scope.listTrump = {};
	$scope.listDump = {};

	$scope.$watch('listTweet', function(newValue, oldValue) {
  		if (JSON.stringify($scope.listTrump) != '{}') {
  			location = '#/answer/trump';
  		}
  		if (JSON.stringify($scope.listDump) != '{}') {
  			location = '#/answer/dump';
  		}
	});
});