angular.module('entrance-points',['ngRoute'])
  .config(function($routeProvider){
    $routeProvider
      .when('/',{
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      })
      .otherwise({redirectTo:'/'});
  });
