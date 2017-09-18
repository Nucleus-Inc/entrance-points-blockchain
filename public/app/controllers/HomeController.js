angular.module('entrance-points').controller('HomeController',['$scope','ModalService','EntranceService',
  function($scope,ModalService,EntranceService){

    EntranceService.logs().then(function(res){
      $scope.customers = res.data;
    }).catch(function(err){
      console.log(err);
    });

    EntranceService.address().then(function(res){
      console.log(res);
      if(res.data == 0)
        $scope.deployed = false;
      else
        $scope.deployed = true;
      console.log($scope.deployed);
    }).catch(function(err){
      console.log(err);
    });

    $scope.deployContract = function(){
      ModalService.showModal({
        templateUrl: "partials/modal/deploy.html",
        controller: "DeployController",
        inputs: {
          title: "Do you want really deploy contract in blockchain?"
        }
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          if(result.msg){
            EntranceService.deploy().then(function(res){
              $scope.deployed = true;
            }).catch(function(err){
              console.log(res);
            });
          }
        });
      });
    };

    $scope.entranceModalShow = function(status){
      var modalTitle = status ? "Do you want to register your entry?" : "Do you want to register your output?";
      ModalService.showModal({
        templateUrl: "partials/modal/entrance.html",
        controller: "EntranceController",
        inputs: {
          title: modalTitle
        }
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          if(result.msg){
            result.body.status = status;
            if(status){ //input
              EntranceService.input(result.body).then(function(res){
                console.log(res);
              }).catch(function(err){
                console.log(err);
              });
            }else{ //output
              EntranceService.output(result.body).then(function(res){
                console.log(res);
              }).catch(function(err){
                console.log(err);
              });
            }
          }
        });
      });
    };

    $scope.userModalShow = function(status){
      var modalTitle = status ? "Do you really want to create the user?" : "Do you really want to remove the user?";
      ModalService.showModal({
        templateUrl: "partials/modal/user.html",
        controller: "UserController",
        inputs: {
          title: modalTitle
        }
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          if(result.msg){
            EntranceService.create(result.body).then(function(res){
              $scope.customer = res.data;
            }).catch(function(err){
              console.log(err);
            });
          }
        });
      });
    };

    $scope.getModalShow = function(status){
      var modalTitle = "";
      switch(status){
        case 'adm':
          modalTitle = "Do you get administrator info?";
          break;
        case 'lsp':
          modalTitle = "Do you get last position info?";
          break;
        case 'lse':
          modalTitle = "Do yout get last entrance info?";
          break;
        default:
          modalTitle = "Do you get a time?";
          break;
      }
      ModalService.showModal({
        templateUrl: "partials/modal/getinfo.html",
        controller: "GetInfoController",
        inputs: {
          title: modalTitle
        }
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          //$scope.message = result ? "You said Yes" : "You said No";
          console.log(result);
        });
      });
    };

  }
]);
