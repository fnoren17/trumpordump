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

trumpOrDumpApp.controller('StatisticsCtrl',function($scope, firebase){
	$scope.butInfo = "CLICK";

    var stat_data = "";
    var reference = firebase.database().ref('statistics');
    reference.on('value', function(snapshot) {
      var stat_data = JSON.parse(JSON.stringify(snapshot));

      $scope.$apply(function () {
        $scope.right = stat_data[0];
        $scope.wrong = stat_data[1];
      });

      console.log($scope.right);
      
    var w = 300,                        //width
    h = 300,                            //height
    r = 100,                            //radius
       //builtin range of colors
    color = d3.scale.ordinal().range(['#b4aeff','#ff8c8c']);
    data = [{"label":"Right", "value":$scope.right}, 
            {"label":"Wrong", "value":$scope.wrong}];
    d3.select("stat")[0][0].innerHTML = "";
    var vis = d3.select("stat")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([data])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)

        arcs.append("svg:path")
                .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc)
                .on('hover',console.log(data));                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

        arcs.append("svg:text")                                     //add a label to each slice
                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")                          //center the text on it's origin
            .text(function(d, i) { return data[i].label; });        //get the label from our original data array



    });

    
});