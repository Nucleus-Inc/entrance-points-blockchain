var Web3 = require('web3');
var BigNumber = require('bignumber.js');

module.exports = function(app){

  //var Entrance = app.models.entrance;
  var controller = {};

  controller.entrancePoints = function(req,res){
    
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:8545'));
    
    web3.eth.defaultAccount = web3.eth.coinbase;
    
    var abi = [{"constant":false,"inputs":[{"name":"_addressFuncionario","type":"address"}],"name":"getHorarioCadastrado","outputs":[{"name":"_horaEntrada","type":"uint256"},{"name":"_horaSaida","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addressFuncionario","type":"address"}],"name":"removerUltimoPonto","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addressFuncionario","type":"address"}],"name":"getUltimaPosicao","outputs":[{"name":"_pos","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getAdministrador","outputs":[{"name":"_administrador","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addressFuncionario","type":"address"}],"name":"getUltimoPonto","outputs":[{"name":"_horario","type":"uint256"},{"name":"_status","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addressFuncionario","type":"address"},{"name":"_horaEntrada","type":"uint256"},{"name":"_horaSaida","type":"uint256"}],"name":"criarFuncionario","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addressFuncionario","type":"address"}],"name":"removerFuncionario","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addressFuncionario","type":"address"},{"name":"_horario","type":"uint256"},{"name":"_status","type":"bool"}],"name":"baterPonto","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
    var SistemaDePonto = web3.eth.contract(abi);
    var c = SistemaDePonto.at('0x9e61c4096d43dE9A1e6FFb31402FEeC957E11453');

    var address = web3.eth.accounts[1]+"";
    c.getHorarioCadastrado.call(address,{from: web3.eth.accounts[0]},function(err,data){
      if(err)
        console.log(err);
      console.log(data);
    });

  };

  controller.createUser = function(req,res){
    
    var web3 = new Web3();
    web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:8545'));
    
    web3.eth.defaultAccount = web3.eth.coinbase;
    
    var abi = [{"constant":false,"inputs":[{"name":"_addressFuncionario","type":"address"}],"name":"getHorarioCadastrado","outputs":[{"name":"_horaEntrada","type":"uint256"},{"name":"_horaSaida","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addressFuncionario","type":"address"}],"name":"removerUltimoPonto","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addressFuncionario","type":"address"}],"name":"getUltimaPosicao","outputs":[{"name":"_pos","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"getAdministrador","outputs":[{"name":"_administrador","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addressFuncionario","type":"address"}],"name":"getUltimoPonto","outputs":[{"name":"_horario","type":"uint256"},{"name":"_status","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addressFuncionario","type":"address"},{"name":"_horaEntrada","type":"uint256"},{"name":"_horaSaida","type":"uint256"}],"name":"criarFuncionario","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addressFuncionario","type":"address"}],"name":"removerFuncionario","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_addressFuncionario","type":"address"},{"name":"_horario","type":"uint256"},{"name":"_status","type":"bool"}],"name":"baterPonto","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
    var SistemaDePonto = web3.eth.contract(abi);
    var c = SistemaDePonto.at('0x9e61c4096d43dE9A1e6FFb31402FEeC957E11453');    

    var personal = web3.personal;
    personal.unlockAccount(web3.eth.accounts[0], '1234', 30000);

    //var newPersonal = personal.newAccount("123456789");

    //console.log(newPersonal);

    c.criarFuncionario.call(web3.eth.accounts[1]+"",700,1080,{from: web3.eth.accounts[0]},function(err,data){
      if(err)
        console.log(err);
      console.log(data);
    });

    //web3.toAscii('0x31332d30392d32303137000000000000')

  };

  return controller;

}
