'use strict';

angular.module('app-index', [])
  .constant('ENDPOINT_URI', 'https://noterious.firebaseio.com/')
  .config(function () {
  })
  .controller("AppController", [require("./config")])
  .run(require("./config"))
;
