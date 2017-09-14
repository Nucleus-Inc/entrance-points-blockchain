var Web3 = require('web3');
var config = require('../../config/config');

module.exports = function(app){

  //var Entrance = app.models.entrance;
  var controller = {};

  var connection = function(){

    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider(config.uri));
    web3.eth.defaultAccount = web3.eth.coinbase;
    
    var abi = config.abi;
    var EntrancePoints = web3.eth.contract(abi);
    var instanceContract = EntrancePoints.at(config.address);

    return {'instance': instanceContract,'web3': web3};

  }

  controller.entrancePoints = function(req,res){
    
    var contract = connection();

    var instanceContract = contract.instance;

  };

  controller.createUser = function(req,res){

    var contract = connection();

    var instanceContract = contract.instance;

    var web3 = contract.web3;
    
    var personal = web3.personal;
    
    personal.unlockAccount(web3.eth.accounts[0], config.privateKey, config.gasLimit);

    web3.eth.defaultBlock = web3.eth.blockNumber;

    instanceContract.createEmployee(req.body.privateKey,req.body.inputTime,req.body.outputTime,{from: web3.eth.accounts[0]},function(err,data){
      if(err)
        res.json({'data': err});
      else
        txHash = data;
    });

    var event = instanceContract.EmployeeCreateEvent();

    event.watch(function(error, result){
      if(error)
        res.json({'data': error});
      else{
        res.json(result);
      } 
    });

    //web3.toAscii('0x31332d30392d32303137000000000000')*/

    /*{
  "address": "0x10105958f46df106c361a42d1bb5afc254ceaadf",
  "blockNumber": 9573,
  "transactionHash": "0xac901e3f8c61add70ab2e4608de8122a269a122bfc87525e4998f65ffac652d9",
  "transactionIndex": 0,
  "blockHash": "0x79237ec3d4d3fe99f8f637a6b7ab1dcdd99c635792e945abb0fb1b7b8fcc83c7",
  "logIndex": 0,
  "removed": false,
  "event": "EmployeeCreateEvent",
  "args": {
    "_employee_id": "0x420e209ec411c92504dc17d7ef86e0e53e1f451e",
    "_time_input": "0x38",
    "_time_output": "0x31",
    "_code": "200"
  }
}*/

  };

  return controller;

}
