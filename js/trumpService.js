// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
trumpOrDumpApp.factory('Trump',function ($resource,$cookieStore) {
	
	
	var tweets = [];
	var score = 0;
	
	var q = Math.round(Math.random()) //q = 1 real tweet, q = 0 false tweet
	var correctAns;
	
	var currentTweet = "";

	this.downloadTweets = function(num){
		var t = [];
		
		for(i = 0; i < num; i++){
			$resource('https://api.whatdoestrumpthink.com/api/v1/quotes/random').get({},function(data){
				t.push(data.message);	
			});
		};
		
		return t;
	};
	
	tweets = this.downloadTweets(6); //tweets for training data
	
	//memorizes the random pick so it doesn't get lost during page reload
	if (!$cookieStore.get('q')){
		$cookieStore.put('q',q);
	}else{
		q = $cookieStore.get('q');
	}
	
	//stores the current score in cookies
	if (!$cookieStore.get('score')){
		$cookieStore.put('score',0);
	}else{
		score = $cookieStore.get('score');
	}
	
	//stores the current tweet in cookies
	if (!$cookieStore.get('currentTweet')){
		$cookieStore.put('currentTweet',currentTweet);
	}else{
		currentTweet = $cookieStore.get('currentTweet');
	}
	
	this.getScore = function(){
		return score;
	};
	
	this.updateScore = function(new_score){
		if(new_score > -1){
			score = new_score;
			$cookieStore.put('score',score);
		}else{
			score = 0;
			$cookieStore.put('score',score);
		};
	};
	
	this.getHighScore = function(){
		
	};
	
	this.updateHighScore = function(data){
		
	};
	
	this.getAnswer = function(){
		return correctAns;
	};
	
	//---------------------------------------------------------------------------------------------------------------
	//markov chain code, base taken from http://www.soliantconsulting.com/blog/2013/02/title-generator-using-markov-chains
	//---------------------------------------------------------------------------------------------------------------
	
	var terminals = {}; //words that end a sentence
	var startwords = []; //words that start a sentence 
	var wordstats = {}; //Stores follow-up words for each word, more frequent appear as more elements

	//picks the next word in the chain
	var choice = function (a) {
			var i = Math.floor(a.length * Math.random());
			return a[i];
	};

	//makes a random walk through the markov chain
	var randomWalk = function (min_length) {
	
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
			return randomWalk(min_length);
		
		return tweet.join(' ');
	};
	
	var buildMarkov = function(data){
		//if(data.length > 9){ //makes sure we load all the 7 tweets
			
			var t = [];
			var exists = false;
			
			//makes sure there is no duplicate tweets
			for(i = 0; i < data.length; i++){
				for(j = 0; j < t.length; j++){
					if(data[i] == t[j]){
						exists = true;
						break;
					};
				};
				if(exists == false)
					t.push(data[i]);

				exists = false;
			};
			
			data = t;
			
			//this for-loop builds the markov chain
			for (var i = 0; i < data.length; i++) {
				var words = data[i].split(' ');
				
				terminals[words[words.length-1]] = true;
				startwords.push(words[0]);
				
				if(words.length > 10){ //order 2 for longer tweets (checks 2 words)
					for (var j = 0; j < words.length - 1; j++) {
						if (wordstats.hasOwnProperty(words[j]) && wordstats.hasOwnProperty(words[j+1])) {
							wordstats[words[j]].push(words[j+1]);
							wordstats[words[j+1]].push(words[j+2]);
						} else {
							wordstats[words[j]] = [words[j+1]];
							wordstats[words[j+1]] = [words[j+2]];
						}
					}
				}else{ //order 1 for short tweets
					for (var j = 0; j < words.length - 1; j++) {
						if (wordstats.hasOwnProperty(words[j])) {
							wordstats[words[j]].push(words[j+1]);
						} else {
							wordstats[words[j]] = [words[j+1]];
						}
					}
				};
			}
			
			return randomWalk(2); //generates a new tweet with min length of 2 words
		//}
		
		//return "";
	};
	
	//---------------------------
	//Markov chain code ends here
	//---------------------------
	
	
	this.getTweet = function(){
		
		if(tweets.length > 5){
			
			q = Math.round(Math.random())
			$cookieStore.put('q',q);
			
			if(q > 0){
				correctAns = true;
				currentTweet = tweets[Math.floor(tweets.length * Math.random())];
				$cookieStore.put('currentTweet',currentTweet);
				return currentTweet;
			}else{
				correctAns = false;
				currentTweet = buildMarkov(tweets);
				
				tweets = this.downloadTweets(6); //download 10 new tweets
				
				$cookieStore.put('currentTweet',currentTweet);
				return currentTweet;
			};
			
		}else{
			
			q = $cookieStore.get('q');
			
			if(q > 0){
				correctAns = true;
			}else{
				correctAns = false;
			};
			
			return currentTweet;
		};
	};
	
  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});