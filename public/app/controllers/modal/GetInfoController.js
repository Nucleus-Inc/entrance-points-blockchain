angular.module('entrance-points').controller('GetInfoController',['$scope','close','title','moment','$interval',
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
          'time': $scope.time.getHours()+":"+$scope.time.getMinutes()+":"+$scope.time.getSeconds(),
          'date': $scope.time.getDate()+"/"+($scope.time.getMonth()+1)+"/"+$scope.time.getFullYear()
        }
      };
   	  close(res, 500); // close, but give 500ms for bootstrap to animate
    };

  }
]);
