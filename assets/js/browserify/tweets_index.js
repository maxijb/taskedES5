/*
* Behavior for index action
*/

var React = require('react');
components.Searchbox = require('../../components/Searchbox');

W.modules.startup.tweets_index = (function() {

	

		init = function() {
			React.render(React.createElement(components.Searchbox, {}), document.getElementById('searchbox-wrapper'));
		}


	return {
		init: init, 
		condition: (W.request.action == 'tweets_index')
	};


})();