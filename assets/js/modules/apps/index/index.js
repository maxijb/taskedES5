'use strict';

angular.module('app-index', [])
  .constant('ENDPOINT_URI', 'https://noterious.firebaseio.com/')
  .config(function () {
  })
  .controller("AppController", ['$scope', require("./controller")])
  // .controller("AppController", ['$scope', function($scope) {} ])
  .run(require("./run"))
;
