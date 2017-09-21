var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var helmet = require('helmet');

module.exports = function(){

  var app = express();

  // variável de ambiente
  app.set('port', (process.env.PORT || 5000));

  // middlewares
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(require('method-override')());

  app.set('view engine','ejs');
  app.set('views','./app/views');

  app.use(express.static('./public'));

  app.use(cookieParser());
  app.use(session(
    {
      secret: 'Nucleus.eti BeSmart',
      resave: true,
      saveUninitialized: true
    }
  ));

  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.hidePoweredBy({setTo: 'PHP 5.5.14'}));

  load('models',{cwd: 'app'})
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
}
