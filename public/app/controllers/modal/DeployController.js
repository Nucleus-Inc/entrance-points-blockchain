angular.module('entrance-points').controller('DeployController',['$scope','close','title','moment','$interval',
  function($scope,close,title,moment,$interval){

    $scope.title = title;

    var tick = function() {
        $scope.time = new Date();
    };
    tick();
    $interval(tick, 1000);

    $scope.close = function(result) {
      var res = {
        'msg': result
      };
   	  close(res, 500); // close, but give 500ms for bootstrap to animate
    };

  }
]);
