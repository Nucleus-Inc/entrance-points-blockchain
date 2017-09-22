angular.module('entrance-points').service('EntranceService',function($http){

  this.deploy = function(){
    return $http.get('/api/contract/deploy').then(function(res){
      return res;
    }).catch(function(err){
      return err;
    });
  };

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

  this.create = function(body){
    return $http.post('/api/contract/user',body).then(function(res){
      return res;
    }).catch(function(err){
      return err;
    });
  };

  this.delete = function(body){
    return $http.delete('/api/contract/user',body).then(function(res){
      return res;
    }).catch(function(err){
      return err;
    });
  };

  this.address = function(){
    return $http.get('/api/contract/address').then(function(res){
      return res;
    }).catch(function(err){
      return err;
    });
  };

  this.save = function(body){
    return $http.post('/api/contract/logs',body).then(function(res){
      return res;
    }).catch(function(err){
      return err;
    });
  };

  this.logs = function(){
    return $http.get('/api/contract/logs').then(function(res){
      return res;
    }).catch(function(err){
      return err;
    });
  };

});
