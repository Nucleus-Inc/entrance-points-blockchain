angular.module('entrance-points',['ngRoute','angularModalService','angularMoment'])
  .config(function($routeProvider){
    $routeProvider
      .when('/',{
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      })
      .otherwise({redirectTo:'/'});
  })
  .run(function(amMoment) {
  	amMoment.changeLocale('pt-br');
  });
