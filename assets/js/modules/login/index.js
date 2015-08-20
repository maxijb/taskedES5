angular.module('login', [])
.controller('loginController', ['$scope', '$rootScope', 'loginService', require('./controller')])
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