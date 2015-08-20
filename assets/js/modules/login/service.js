module.exports = function($rootScope, $http) {
	var url
	this.user = W.user || null;


	

	// TODO: Validate client-side and handle errors
	this.authenticateUser = function(user) {

		$http.get("/user/login", {params: user})
		.then(function(response) {
			if (response && response.data && !response.data.error ) {
					updateUser(response.data);
			}
		})
	}


	// TODO: Validate client-side and handle errors
	this.createUser =function(user) {
		$http.post("/user/signup", user)
		.then(function(response) {
			if (response && response.data && !response.data.error) {
				updateUser(response.data);
			}
		});
	}



	function updateUser(user) {
		$rootScope.$broadcast("USER-update", user);
	}
	
}
