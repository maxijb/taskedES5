module.exports = function($rootScope, $http) {
	var url
	this.user = W.user || null;


	

	// TODO: Auth this user and return stat 
	this.authenticateUser = function(user) {

	}


	// TODO: Create new user and return it 
	this.createUser =function(user) {
		$http.post("/user/signup", user)
			.then(function(response) {
				if (response && response.data && response.data.id) {
					$rootScope.$broadcast("USER-update", response.data);
				}
			});
	}
}