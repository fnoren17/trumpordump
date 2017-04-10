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
	
	var config = {
        apiKey: "AIzaSyCnqSAk4dytUEu-U9W-DXmSaWwYf2ugaVc",
        authDomain: "trumpordump-952c7.firebaseapp.com",
        databaseURL: "https://trumpordump-952c7.firebaseio.com",
        storageBucket: "trumpordump-952c7.appspot.com",
        messagingSenderId: "686668715673"
    };

    firebase.initializeApp(config);

    var database = firebase.database();
    
    this.me = function() {
      console.log("uid: ", firebase.auth().currentUser.uid);
      return firebase.auth().currentUser.uid;
    }

    this.myHighScore = function(cb) {
      firebase.database().ref("/users/" + firebase.auth().currentUser.uid).once("value",function(data){
        console.log("JSON: ",JSON.parse(JSON.stringify(data)));
        score = JSON.parse(JSON.stringify(data)).highScore;
        cb(score);
      });
    }

    this.getDatabase = function(input,cb) {
      firebase.database().ref(String(input)).once("value",function(snapshot){
        cb(JSON.parse(JSON.stringify(snapshot)));
      },
      function(error){
        console.log(error);
        console.log(firebase.auth().currentUser);
      });
    }

    this.setHighScore = function(score) {
      firebase.database().ref("/users/" + firebase.auth().currentUser.uid).once("value",function(data){
        firebase.database().ref("/users/" + firebase.auth().currentUser.uid ).update({"highScore":score});
      });
    }

    this.setStatistics = function(rightwrong) {
      firebase.database().ref("/statistics").once("value",function(data) {
        data = JSON.parse(JSON.stringify(data));
        if (rightwrong == "right") {
          data[0] +=1;
        }
        else if (rightwrong == "wrong") {
          data[1] +=1;
        }
        console.log(data);
        firebase.database().ref("/statistics/").update(data);
      });
    }

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
      // console.log("Fb.auth(): ", firebase.auth().currentUser.email);
      // if (typeof firebase.auth().currentUser.email == "string"){
      //   window.location.replace("#/question");
      // }
    }

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
      var userId = firebase.auth().currentUser.uid;
      var JSONDATA = '{"highScore" : 0,"tweetsSeen" : [ true ]}';
      console.log(JSONDATA);
      firebase.database().ref('users/' + userId).set(JSON.parse(JSONDATA));
    }

    return this;

});