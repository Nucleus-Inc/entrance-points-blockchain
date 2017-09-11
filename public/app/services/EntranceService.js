angular.module('entrance-points').service('EntranceService',function($http){

  this.input = function(body){
    return $http.post('/api/contract/entrance',body).then(function(res){
      return res;
    }).catch(function(err){
      return err;
    });
  };

  this.output = function(body){
    return $http.post('/api/contract/entrance',body).then(function(res){
      return res;
    }).catch(function(err){
      return err;
    });
  };

});
