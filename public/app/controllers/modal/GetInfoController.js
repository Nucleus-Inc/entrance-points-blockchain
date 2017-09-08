angular.module('entrance-points').controller('GetInfoController',['$scope','close','title',
  function($scope,close,title){

    $scope.title = title;

    $scope.close = function(result) {
   	  close(result, 500); // close, but give 500ms for bootstrap to animate
    };

  }
]);
