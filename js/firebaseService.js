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

trumpOrDumpApp.factory('firebase',function ($resource) {
	
  // CONFIG INFO
	var config = {
        apiKey: "AIzaSyCnqSAk4dytUEu-U9W-DXmSaWwYf2ugaVc",
        authDomain: "trumpordump-952c7.firebaseapp.com",
        databaseURL: "https://trumpordump-952c7.firebaseio.com",
        storageBucket: "trumpordump-952c7.appspot.com",
        messagingSenderId: "686668715673"
  };

    firebase.initializeApp(config);

    // FUNCTIONS IN firebaseService

    //Redirect to question if you already are logged in and to start if you're not  
    firebase.auth().onAuthStateChanged(function(user){
      if(user) {
        window.location = "#/question";
      } else if(!user){
        window.location = "#/start";
      }
      });    
    // Getting own user-id.
    this.me = function() {
      return firebase.auth().currentUser.uid;
    }

    // Getting highscore
    this.myHighScore = function(cb) {
      firebase.database().ref("/users/" + firebase.auth().currentUser.uid).once("value",function(data){
        var score = JSON.parse(JSON.stringify(data)).highScore;
        cb(score);
      });
    }

    // Getting the database, whole or a part of it based on input.
    this.getDatabase = function(input,cb) {
      firebase.database().ref(String(input)).once("value",function(snapshot){
        cb(JSON.parse(JSON.stringify(snapshot)));
      },
      function(error){
        console.log(error);
        console.log(firebase.auth().currentUser);
      });
    }

    // Getting all the scores, using .on so more live.
    this.getLiveHighScore = function(cb) {
      firebase.database().ref('users/').on("value",function(snapshot){
        cb(JSON.parse(JSON.stringify(snapshot)));
      },
      function(error){
        console.log(error);
        console.log(firebase.auth().currentUser);
      });
    }

    // Setting the highscore when you reach a new highscore.
    this.setHighScore = function(score) {
      firebase.database().ref("/users/" + firebase.auth().currentUser.uid).once("value",function(data){
        firebase.database().ref("/users/" + firebase.auth().currentUser.uid ).update({"highScore":score});
      });
    }

    // Setting statistics for wrong and right.
    this.setStatistics = function(rightwrong) {
      firebase.database().ref("/statistics").once("value",function(data) {
        data = JSON.parse(JSON.stringify(data));
        if (rightwrong == "right") {
          data[0] +=1;
        }
        else if (rightwrong == "wrong") {
          data[1] +=1;
        }
        firebase.database().ref("/statistics/").update(data);
      });
      userId = firebase.auth().currentUser.uid;
      firebase.database().ref("/users/" + userId).once("value",function(data) {
        data = JSON.parse(JSON.stringify(data));
        if (rightwrong == "right") {
          data.right += 1;
        }
        else if (rightwrong == "wrong") {
          data.wrong += 1;
        }
        firebase.database().ref("/users/" + userId).update(data);
      });
    }

    // LOGIN FUNCTIONS
    this.login = function(email, password) {
      firebase.auth().signInWithEmailAndPassword(email, password)
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
      
      firebase.auth().onAuthStateChanged(function(user){
        if(user) {
         window.location = "#/question";
        }
      });

      //if(firebase.auth().currentUser.email){
      //  window.location.href = "#/question";
      //}
    }

    // SIGNOUT FUNCTION
    this.signOut = function(){
      firebase.auth().signOut().then(function() {
        ///console.log('Signed Out');
      }, function(error) {
        console.error('Sign Out Error', error);
      });
    }

    // NEW ACCOUNT FUNCTION
    this.newAccount = function(email, password) {
      user = firebase.auth().createUserWithEmailAndPassword(email, password)
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

    // ADDING NEW USER DATA
    firebase.auth().onAuthStateChanged(function(user){
      if(user) {
        var userId = user.uid;
        var JSONDATA = '{"highScore":0,"right":0,"wrong":0}';
        firebase.database().ref('users/' + userId).set(JSON.parse(JSONDATA));
        window.location = "#/question";
      }
    });
  }
   

    // RETURNING THIS
    return this;

});