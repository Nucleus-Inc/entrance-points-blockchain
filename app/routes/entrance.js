module.exports = function(app){

  var controller = app.controllers.entrance;

  app.route('/api/contract/deploy')
    .get(controller.deployContract);

  app.route('/api/contract/address')
  	.get(controller.address);

  app.route('/api/contract/entrance')
    .post(controller.entrancePoints);

  app.route('/api/contract/user/create')
  	.post(controller.createUser); 

  app.route('/api/contract/logs')
  	.get(controller.logs);

}
