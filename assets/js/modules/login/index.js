// var rr = require('./controllerES6');
import {default as controller} from './controllerES6'; 


angular.module('login', [])
.controller('loginController', ['$scope', '$rootScope', 'loginService', controller])
.service('loginService', ['$rootScope', '$http', require('./service')])
.directive('loginComponent', function() {
  return {
  	  restrict: 'EA',
      scope: true,
      templateUrl: 'static/templates/modules/login/login.html',
      controller: 'loginController',
      controllerAs: 'ctrl',
      bindToController: true
    }
})
