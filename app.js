process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var http = require("http");
var config = require('./config/config');
var app = require('./config/express')();

require('./config/database.js')(config.db);

var server = http.createServer(app);

require('./config/socket')(server);

server.listen(process.env.PORT || app.get('port'), function(){
  console.log('Express Server escutando na porta '+ app.get('port'));
});