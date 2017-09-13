angular.module('entrance-points').controller('UserController',['$scope','close','title','moment','$interval',
  function($scope,close,title,moment,$interval){

    $scope.title = title;

    var tick = function() {
        $scope.time = new Date();
    };
    tick();
    $interval(tick, 1000);

    $scope.close = function(result) {
      var res = {
        'msg': result,
        'body': {
          'address': $scope.address,
          'input': $scope.input.getHours()+':'+$scope.input.getMinutes(),
          'output': $scope.output.getHours()+':'+$scope.output.getMinutes()
        }
      };
   	  close(res, 500); // close, but give 500ms for bootstrap to animate
    };

  }
]);
