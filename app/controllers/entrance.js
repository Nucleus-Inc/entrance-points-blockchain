var Web3 = require('web3');

module.exports = function(app){

  //var Entrance = app.models.entrance;
  var controller = {};

  if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
  var eth = web3.eth;

  //Desbloquear conta
  var personal = web3.personal;
  personal.unlockAccount(eth.accounts[0], '1234');

  var abiArray = [ { "constant": true, "inputs": [], "name": "getValues", "outputs": [ { "name": "", "type": "uint256[]", "value": [ "27" ] } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_newValue", "type": "uint256" } ], "name": "setX", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getX", "outputs": [ { "name": "", "type": "uint256", "value": "27" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "values", "outputs": [ { "name": "", "type": "uint256", "value": "27" } ], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "newValue", "type": "uint256" }, { "indexed": false, "name": "oldValue", "type": "uint256" } ], "name": "NewValue", "type": "event" } ];
  var VerySimpleContract = web3.eth.contract(abiArray);

/*
  //Obter instância do contrato
  var abiArray = [ { "constant": true, "inputs": [], "name": "getValues", "outputs": [ { "name": "", "type": "uint256[]", "value": [ "27" ] } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "_newValue", "type": "uint256" } ], "name": "setX", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "getX", "outputs": [ { "name": "", "type": "uint256", "value": "27" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "values", "outputs": [ { "name": "", "type": "uint256", "value": "27" } ], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "newValue", "type": "uint256" }, { "indexed": false, "name": "oldValue", "type": "uint256" } ], "name": "NewValue", "type": "event" } ];
  var VerySimpleContract = web3.eth.contract(abiArray);
  var c = VerySimpleContract.at('0x69eA25e9650ade5610c1F79128B393CB40f45dA4');*/

  controller.entrancePoints = function(req,res){
    console.log(req.body);
  };

  return controller;

}
