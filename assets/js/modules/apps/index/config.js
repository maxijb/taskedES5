module.exports = function ($stateProvider, $urlRouterProvider) { 
    $urlRouterProvider.otherwise('/');

    // $stateProvider
    //   .state('login', {
    //     url:'/login',
    //     templateUrl: 'app/login/login.tmpl.html',
    //     controller: 'LoginCtrl',
    //     controllerAs: 'login'
    //   })
    //   .state('boards', {
    //     url:'/boards',
    //     templateUrl: 'app/boards/boards-mdv.tmpl.html',
    //     controller: 'BoardsCtrl',
    //     controllerAs: 'ctrl',
    //     resolve: {
    //       'currentUser': ['Auth', function (Auth) {
    //         return Auth.$requireAuth();
    //       }]
    //     }
    //   })
    //   .state('notes', {
    //     url:'/boards/:boardId/notes',
    //     templateUrl: 'app/notes/notes-mdv.tmpl.html',
    //     controller: 'NotesCtrl',
    //     controllerAs: 'ctrl',
    //     resolve: {
    //       'currentUser': ['Auth', function (Auth) {
    //         return Auth.$requireAuth();
    //       }]
    //     }
    //   })
    // ;
  }