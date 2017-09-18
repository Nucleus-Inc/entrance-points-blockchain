var Web3 = require('web3');
var config = require('../../config/config');

module.exports = function(app){

  var Entrance = app.models.entrance;
  var controller = {};

  controller.address = function(req,res){
    
    Entrance.find().then(function(data){
      if(data[0])
        res.json(data[0].address);
      else
        res.json(0);
    }).catch(function(err){
      res.json(err);
    });

  };

  controller.deployContract = function(req,res){
    
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider(config.uri));
    web3.eth.defaultAccount = web3.eth.coinbase;
    
    var personal = web3.personal;
    personal.unlockAccount(web3.eth.accounts[0], config.privateKey, config.gasLimit);
    
    var entrancepointsContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getAdministrator","outputs":[{"name":"_administrator","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_employee_id","type":"address"}],"name":"employeeDelete","outputs":[{"name":"_code","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_employee_id","type":"address"},{"name":"_time","type":"string"},{"name":"_date","type":"string"},{"name":"_status","type":"bool"}],"name":"record","outputs":[{"name":"_code","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_employee_id","type":"address"}],"name":"getLastPosition","outputs":[{"name":"_position","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_employee_id","type":"address"},{"name":"_time_input","type":"string"},{"name":"_time_output","type":"string"}],"name":"createEmployee","outputs":[{"name":"_code","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_employee_id","type":"address"}],"name":"getHours","outputs":[{"name":"_time_input","type":"string"},{"name":"time_output","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_employee_id","type":"address"}],"name":"recordDelete","outputs":[{"name":"_code","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_employee_id","type":"address"}],"name":"getLastRecord","outputs":[{"name":"_time","type":"string"},{"name":"_date","type":"string"},{"name":"_status","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_employee_id","type":"address"},{"indexed":false,"name":"_time_input","type":"string"},{"indexed":false,"name":"_time_output","type":"string"},{"indexed":false,"name":"_code","type":"uint256"}],"name":"EmployeeCreateEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_employee_id","type":"address"},{"indexed":false,"name":"_time","type":"string"},{"indexed":false,"name":"_date","type":"string"},{"indexed":false,"name":"_status","type":"bool"},{"indexed":false,"name":"_code","type":"uint256"}],"name":"RecordEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_employee_id","type":"address"},{"indexed":false,"name":"_code","type":"uint256"}],"name":"RecordDeleteEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_employee_id","type":"address"},{"indexed":false,"name":"_code","type":"uint256"}],"name":"EmployeeDeleteEvent","type":"event"}]);
    var entrancepoints = entrancepointsContract.new(
       {
         from: web3.eth.accounts[0], 
         data: config.byteCode, 
         gas: config.gasLimit
       }, function (e, contract){
          if (typeof contract.address !== 'undefined')
            Entrance.create({address: contract.address,transactionHash: contract.transactionHash,event: 'DeployContractEvent'}).then(function(data){res.json(data);}).catch(function(err){res.json(err);})
     });

  };

  controller.entrancePoints = function(req,res){
    /*var contract = connection();
    var instanceContract = contract.instance;*/
  };

  controller.createUser = function(req,res){
    
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider(config.uri));
    web3.eth.defaultAccount = web3.eth.coinbase;

    var personal = web3.personal;
    personal.unlockAccount(web3.eth.accounts[0], config.privateKey, config.gasLimit);

    var abi = config.abi;
    var EntrancePoints = web3.eth.contract(abi);

    Entrance.find().then(function(data){
      if(data[0]){
        var instanceContract = EntrancePoints.at(data[0].address);
        instanceContract.createEmployee.sendTransaction(req.body.employeeId,req.body.inputTime,req.body.outputTime,{from: web3.eth.accounts[0]},function(err,result){
          console.log(result);
        });
        var events = instanceContract.allEvents(function(error, log){
          if (!error)
            console.log(log);
        });
      }
    }).catch(function(err){
      res.json(err);
    });

  };

  controller.logs = function(req,res){
    Entrance.find().then(function(data){res.json(data)}).catch(function(err){res.json(err)});
  };

  return controller;

}
