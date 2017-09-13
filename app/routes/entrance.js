module.exports = function(app){

  var controller = app.controllers.entrance;

  app.route('/api/contract/entrance')
    .post(controller.entrancePoints);

  app.route('/api/contract/user/create')
  	.post(controller.createUser); 

}
