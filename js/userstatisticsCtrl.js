
trumpOrDumpApp.controller('UserStatisticsCtrl',function($scope, firebase){
    var stat_data = "";
    var userId = firebase.me();
    firebase.getDatabase('users/'+userId,function(snapshot){
      var stat_data = JSON.parse(JSON.stringify(snapshot));
      $scope.right = stat_data.right;
      $scope.wrong = stat_data.wrong;
    });   
});