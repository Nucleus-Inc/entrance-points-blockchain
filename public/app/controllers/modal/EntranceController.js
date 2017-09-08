angular.module('entrance-points').controller('EntranceController',['$scope','close','title','moment','$interval',
  function($scope,close,title,moment,$interval){

    $scope.title = title;

    var tick = function() {
      $scope.message = {
        time: new Date()
      };
    };
    tick();
    $interval(tick, 1000);

    $scope.close = function(result) {
   	  close(result, 500); // close, but give 500ms for bootstrap to animate
    };

  }
]);
