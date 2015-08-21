export default class {

  constructor($scope, $rootScope, loginService) {

    /* ---------------- Dependencies -------------- */
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.loginService = loginService;


    /* -------------- Initialize ------------------ */
    $scope.user = loginService.user;
    $scope.popup = {};
    $scope.form = {};
    $scope.formLogin = {};
    

    /* -------------- Events ------------------ */
    $rootScope.$on("USER-update", this.updateUser.bind(this));

  }
   
    /* -------------- Handlers ------------------ */
    openPopup() {
    	this.$scope.popup.visible = true;
    }
    resetPopup() {
    	this.$scope.popup = { loading: false, visible: false };
    	this.$scope.form = {};
    }
    createForm() {
    	this.$scope.popup.loading = true;
    	this.loginService.createUser(this.$scope.form);
    }
    loginForm() {
      this.$scope.popup.loading = true;
      this.loginService.authenticateUser(this.$scope.formLogin);
    }

    updateUser(event, user, errors) {
    	this.$scope.user = user; 
    	this.$scope.errors = errors;
    	this.resetPopup();
    }
}

