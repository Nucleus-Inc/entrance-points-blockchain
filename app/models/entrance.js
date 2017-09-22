var mongoose = require('mongoose');

module.exports = function(){

  var schema = mongoose.Schema({

  	address: {
  		type: String
  	},
  	blockNumber: {
  		type: String
  	},
  	transactionHash: {
  		type: String
  	},
  	transactionIndex: {
  		type: String
  	},
  	blockHash: {
  		type: String
  	},
  	logIndex: {
  		type: String
  	},
  	removed: {
  		type: String
  	},
  	event: {
  		type: String
  	},
  	args: {
  		_employee_id: {
  			type: String
  		},
  		_time_input: {
  			type: String
  		},
  		_time_output: {
  			type: String
  		},
      _time: {
        type: String
      },
      _date: {
        type: String
      },
      _status: {
        type: String
      },
  		_code: {
  			type: String
  		}
  	}

  });

  return mongoose.model('Entrance',schema);

};
