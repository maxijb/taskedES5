angular.module('login', [])
.controller('loginController', ['$scope', '$rootScope', 'loginService', function($scope, $rootScope, loginService) {
  
  /* -------------- Initialize ------------------ */
  $scope.user = loginService.user;
  $scope.popup = { visible: false };
  $scope.form = { name: "", email: "", confirmEmail: "", password: "" };

  
  
  /* -------------- Handlers ------------------ */
  $scope.openPopup = function() {
  	$scope.popup.visible = true;
  }
  $scope.resetPopup = function() {
  	$scope.popup = { loading: false, visible: false };
  	$scope.form = { name: "", email: "", confirmEmail: "", password: "" };
  }
  $scope.createForm = function() {
  	$scope.popup.loading = true;
  	loginService.createUser($scope.form);
  }
  $scope.loginForm = function() {
    $scope.popup.loading = true;
    loginService.authenticateUser($scope.form);
  }

  $scope.updateUser = function(event, user, errors) {
  	$scope.user = user; 
  	$scope.errors = errors;
  	$scope.resetPopup();
  }

  /* -------------- Events ------------------ */
  $scope.$on("USER-update", $scope.updateUser);


}])
.service('loginService', ['$rootScope', '$http', require('./service')])
.directive('loginComponent', function() {
  return {
  	  // restrict: 'E',
      // scope: {
      // 		customer: '@'
      // },
      //   noteId: '@',
      //   note:'=',
      //   remove:'&'
      // },
      scope: true,
      templateUrl: 'static/templates/login/login.html',
      // template: "<div>{{customer}}</div>",
      controller: 'loginController',
      bindToController: true
    }
});