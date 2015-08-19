angular.module('login', [])
.controller('loginController', ['$scope', function($scope) {
  $scope.user = W.user || {}
}])
.directive('loginComponent', function() {
	console.log(arguments);
  return {
  	  // restrict: 'E',
      // scope: {
      // 		customer: '@'
      // },
      //   noteId: '@',
      //   note:'=',
      //   remove:'&'
      // },
      scope: {user: '='},
      templateUrl: 'static/templates/login/login.html',
      // template: "<div>{{customer}}</div>",
      controller: 'loginController',
      bindToController: true
    }
});