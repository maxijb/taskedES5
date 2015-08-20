/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: Creates and handles user records. Login, signup, login by FB and 3rd parties
 *
 */

module.exports = {
    
  
	/* Authenticate user 
		@param idLogin : username o email
		@param passwordLogin : password
		@return user object 
		@error code: not-found or database-error
	*/
	login: function(req, res) {
		var id = req.param('idLogin'),
			pass = helpers.sha1sum(req.param('passwordLogin'));

		User.findOne()
		.where({
		  or : [
		    { name: id },
		    { email: id }
		  ],
		  password: pass
		})
		.then(function(user){
			if (user) {
			  setUserCookie(req, res, user);
			  res.send(user);
			} else {
				res.send({error: "not-found"});
			}
		})
		.catch(function(err){
		  res.send({error: "database-error"});
		});
	},

	/* Create new user 
		@param name : username
		@param email : email
		@param password : password
		@return user object 
		@error code: not-found or database-error
	*/
	signup : function(req, res) {
		User.create(req.params.all())
			.then(function(item) {

        		setUserCookie(req, res, item);
				res.send(item);


		}, function(error) {
			res.send({errors: ["database-error"]});
		});
	},


	signup3rdParty : function(req, res) {
		User.findOne({type: req.param('type'), native_id: req.param('native_id')})
			.then(function(user) {
				if (user) {
					setUserCookie(req, res, user);
					res.send(user);
				} else {
					User.create(req.params.all())
						.then(function(item) {
							setUserCookie(req, res, item);
							res.send(item);
						});
				}
			});

	},


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to NameController)
   */
  _config: {}

  
};



function setUserCookie(req, res, item) {
	var ctx = req.cookies[sails.config.constants.cookieName];
	ctx.user = {name: item.name, id: item.id};
	res.cookie(sails.config.constants.cookieName, ctx);
}
