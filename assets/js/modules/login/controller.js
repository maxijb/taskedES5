module.exports = function($scope, $rootScope, loginService) {
  
  /* -------------- Initialize ------------------ */
  $scope.user = loginService.user;
  $scope.popup = {};
  $scope.form = {};
  $scope.formLogin = {};

  
  
  /* -------------- Handlers ------------------ */
  $scope.openPopup = function() {
  	$scope.popup.visible = true;
  }
  $scope.resetPopup = function() {
  	$scope.popup = { loading: false, visible: false };
  	$scope.form = {};
  }
  $scope.createForm = function() {
  	$scope.popup.loading = true;
  	loginService.createUser($scope.form);
  }
  $scope.loginForm = function() {
    $scope.popup.loading = true;
    loginService.authenticateUser($scope.formLogin);
  }

  $scope.updateUser = function(event, user, errors) {
  	$scope.user = user; 
  	$scope.errors = errors;
  	$scope.resetPopup();
  }

  /* -------------- Events ------------------ */
  $rootScope.$on("USER-update", $scope.updateUser);


}