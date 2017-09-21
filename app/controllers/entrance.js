var Web3 = require('web3');
var config = require('../../config/config');

module.exports = function(app){

  var Entrance = app.models.entrance;
  var controller = {};

  var web3 = new Web3();
  web3.setProvider(new web3.providers.HttpProvider(config.uri));
  web3.eth.defaultAccount = web3.eth.coinbase;

  var personal = web3.personal;
  personal.unlockAccount(web3.eth.accounts[0], config.privateKey);

  var abi = config.abi;
  var EntrancePoints = web3.eth.contract(abi);
  var instanceContract = EntrancePoints.at(config.address);
  
  var logNewBlockMined = function(){
    var filter = web3.eth.filter('latest');
    filter.watch(function(error, result){
      var block = web3.eth.getBlock(result, true);
      console.log('🔨 mined potential block: ' + block.number);
    });
  };
  logNewBlockMined();

  controller.deployContract = function(req,res){

    var entrancepointsContract = web3.eth.contract(config.abi);
    var sol_entrancepoints = entrancepointsContract.new(
      {
        from: web3.eth.accounts[0], 
        data: config.byteCode, 
        gas: '4300000'
      }, function (e, contract){
        if (typeof contract.address !== 'undefined') {
          console.log('Submitted contract creation'+'               fullhash: '+contract.transactionHash);
          Entrance.create({address: contract.address,transactionHash: contract.transactionHash,event: 'DeployContractEvent'}).then(function(data){res.json(data);}).catch(function(err){res.json(err);})
        }
    });

  };

  controller.entrancePoints = function(req,res){
    
  };

  controller.createUser = function(req,res){

    instanceContract.createEmployee.sendTransaction(req.body.employeeId,req.body.inputTime,req.body.outputTime,{from: web3.eth.accounts[0],gas: '3000000'},function(err,result){
      if(!err){
        console.log('Submitted transaction'+'       fullhash: '+result);
        res.json(result);
      }
    });

  };

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

  controller.logs = function(req,res){
    Entrance.find().then(function(data){res.json(data)}).catch(function(err){res.json(err)});
  };

  return controller;

}

/*Entrance.create({
        address: data.address,
        blockNumber: data.blockNumber,
        transactionHash: data.transactionHash,
        transactionIndex: data.transactionIndex,
        blockHash: data.blockHash,
        logIndex: data.logIndex,
        removed: data.removed,
        event: data.event,
        args: {
          _employee_id: data.args._employee_id,
          _time_input: data.args._time_input,
          _time_output: data.args._time_output,
          _code: data.args._code
        }
      }).then(function(data){}).catch(function(err){});*/