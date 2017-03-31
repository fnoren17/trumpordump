
var trumpOrDumpApp = angular.module('trumpOrDump', ['ngRoute','ngResource']);


trumpOrDumpApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/start', {
        templateUrl: 'partials/start.html',
		controller: 'StartCtrl'
      }).
      when('/question', {
        templateUrl: 'partials/question.html',
        controller: 'QuestionCtrl'
      }).
	  when('/answer', {
        templateUrl: 'partials/answer.html',
        controller: 'AnswerCtrl'
      }).
	  when('/highscore', {
        templateUrl: 'partials/highscore.html',
        controller: 'HighscoreCtrl'
      }).
      otherwise({
        redirectTo: '/start'
      });
  }]);