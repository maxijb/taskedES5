angular.module('login', [])
.controller('loginController', ['$scope', '$rootScope', 'loginService', require('./controller')])
.service('loginService', ['$rootScope', '$http', require('./service')])
.directive('loginComponent', function() {
  return {
  	  restrict: 'EA',
      scope: true,
      templateUrl: 'static/templates/modules/login/login.html',
      controller: 'loginController',
      bindToController: true
    }
})
