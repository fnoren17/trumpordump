
trumpOrDumpApp.controller('StartCtrl',function($scope,Trump){
	
	$scope.showTweet = Trump.getTweets(1);
	
	//markov chain code, taken from http://www.soliantconsulting.com/blog/2013/02/title-generator-using-markov-chains
	
	$scope.tweets = Trump.getTrumpTweets(); //this is the training data
	var fake = "Processing...";
	var markov = false;
	
	var terminals = {}; //ending words
	var startwords = []; //starting words 
	var wordstats = {}; //will hold array of wordarrays, containing follow-up words. Higher probability words are more frequent 
	
	var choice = function (a) {
			var i = Math.floor(a.length * Math.random());
			return a[i];
	};

	var newTrumpTweet = function (min_length) {

		var word = choice(startwords);
		var tweet = [word];
		
		while (wordstats.hasOwnProperty(word)) {
			var next_words = wordstats[word];
			word = choice(next_words);
			tweet.push(word);
			if (tweet.length > min_length && terminals.hasOwnProperty(word)) 
				break;
		}
		if (tweet.length < min_length) 
			return newTrumpTweet(min_length);
		
		return tweet.join(' ');
	};
	
	$scope.fakeTweet = function(){

		if($scope.tweets.length > 4){
			
			if(!markov){
				markov = true;
				
				for (var i = 0; i < $scope.tweets.length; i++) {
					var words = $scope.tweets[i].split(' ');
					terminals[words[words.length-1]] = true; //words that end a sentence
					startwords.push(words[0]); //words that start a sentence
					
					for (var j = 0; j < words.length - 1; j++) {
						if (wordstats.hasOwnProperty(words[j])) {
							wordstats[words[j]].push(words[j+1]);
						} else {
							wordstats[words[j]] = [words[j+1]];
						}
					}
				}
				
				fake = newTrumpTweet(3);

				return fake; 
			}else{
				return fake;
			};
		}else{
			return fake;
		};
	};
	
});