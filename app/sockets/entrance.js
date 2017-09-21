var Web3 = require('web3');
var config = require('../../config/config');

module.exports = function(io){

  io.on('connection', function(socket){

	  console.log('A user connected');

	  var web3 = new Web3();
	  web3.setProvider(new web3.providers.HttpProvider(config.uri));
	  web3.eth.defaultAccount = web3.eth.coinbase;

	  var personal = web3.personal;
	  personal.unlockAccount(web3.eth.accounts[0], config.privateKey);

	  var abi = config.abi;
	  var EntrancePoints = web3.eth.contract(abi);
	  var instanceContract = EntrancePoints.at(config.address);

	  var createEvent = instanceContract.EmployeeCreateEvent({},{fromBlock: 'latest'});
	  createEvent.watch(function(err,data){
	    if(!err)
	    	io.emit('create employee', data);
	  });

	  var recordEvent = instanceContract.RecordEvent({},{fromBlock: 'latest'});
	  recordEvent.watch(function(err,data){
	    if(!err)
	    	io.emit('record event', data);
	  });

	  var delRecordEvent = instanceContract.RecordDeleteEvent({},{fromBlock: 'latest'});
	  delRecordEvent.watch(function(err,data){
	    if(!err)
	    	io.emit('delete record', data);
	  });

	  var delEmployeeEvent = instanceContract.EmployeeDeleteEvent({},{fromBlock: 'latest'});
	  delEmployeeEvent.watch(function(err,data){
	    if(!err)
	    	io.emit('delete employee', data);
	  });

	  socket.on('disconnect', function(){
	  	console.log('User disconnected');
	  });

  });

}