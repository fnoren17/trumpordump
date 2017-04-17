
trumpOrDumpApp.controller('QuestionCtrl',function($scope, Trump){
	
	//var question = "I have to tell you..."; //loading message
	
	$scope.getQuestion = Trump.getTweet();

	$scope.list1 = {title: 'AngularJS - Drag Me'};
	$scope.list2 = {};	

	$scope.changeicon = function(id, flag) {
		if (id == "trump") {
			if(flag == 1){
				document.getElementById("trump").className = "fa fa-thumbs-up fa-4x div1";
			} else if (flag == 2){
				document.getElementById("trump").className = "fa fa-usd fa-4x div1";
			}
			
		} else if (id == "dump") {
			if (flag == 1) {
				document.getElementById("dump").className = "fa fa fa-thumbs-down fa-4x div1";
			} else if(flag == 2){
				document.getElementById("dump").className = "fa fa-trash-o fa-4x div1";
			}
			
		}
	}
	$scope.allowDrop = function(ev, id){
	    ev.preventDefault();
	}

	$scope.drag = function(ev){
	    ev.dataTransfer.setData("text", ev.target.id);
	    document.getElementsByClassName("div1")[0].style.background = "white";
	    document.getElementsByClassName("div1")[1].style.background = "white";
	    document.getElementsByClassName("div1")[0].style.color = "black";
	    document.getElementsByClassName("div1")[1].style.color = "black";
	    fadeOutEffect();
	}

	// Thanks to http://stackoverflow.com/questions/29017379/how-to-make-fadeout-effect-with-pure-javascript for this fadeout function
	$scope.faceOutEffect = function() {
	    var fadeTarget = document.getElementById("bubble");
	    var fadeEffect = setInterval(function () {
	        if (!fadeTarget.style.opacity) {
	            fadeTarget.style.opacity = 1;
	        }
	        if (fadeTarget.style.opacity < 0.1) {
	            clearInterval(fadeEffect);
	        } else {
	            fadeTarget.style.opacity -= 0.1;
	        }
	    }, 20);
	}

	$scope.drop = function(ev) {
	    ev.preventDefault();
	    var data = ev.dataTransfer.getData("text");
	    ev.target.appendChild(document.getElementById(data));
	    ev.toElement.style.background = "skyblue";
	    ev.toElement.style.color = "white";
	    setTimeout(function() { next(ev.toElement.id); }, 500);
	}

	$scope.next = function() {
		// Add /iProgProject/#/answer + id
		//location = '/iProgProject/#/answer/' + id;
		location = '#/answer/' + id;
	}
	
	
});