module.exports = function(app){

  var controller = app.controllers.entrance;

  //Blockchain Routes
  app.route('/api/contract/deploy')
    .get(controller.deployContract);
    
  app.route('/api/contract/user')
    .post(controller.createUser)
    .delete(controller.deleteUser);

  app.route('/api/contract/entrance')
    .post(controller.entrancePoints);

  //DB Routes
  app.route('/api/contract/address')
  	.get(controller.address);

  app.route('/api/contract/logs')
    .post(controller.save)
  	.get(controller.logs);

}
