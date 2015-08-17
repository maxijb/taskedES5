/*
* Behavior for index action
*/
var angular = require("angular"),
	indexApp = require("./../../modules/apps/index");


W.modules.startup.index_action = (function($) {

	

		init = function() {



		}


	return {
		init: init, 
		condition: (W.request.action == 'index')
	};


})(jQuery);



