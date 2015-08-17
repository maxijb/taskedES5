var React = require('react');
var TagsCreateLightbox = require('./TagsCreateLightbox');
module.exports = React.createClass({
  
  componentDidMount: function() {
  },

  getInitialState: function() {
    return {
      showLightbox: false
    }
  },

  openCreateTagLightbox: function() {
  	this.setState({showLightbox: true});
  },

  closeCreateTagLightbox: function() {
  	this.setState({showLightbox: false});
    this.refs.lightbox.reset();
  },

  create: function(name, color) {

    var _this = this;
    this.setState({loading: true});
    
    ///TODO: user should come from the cookie in server side
    $.post('/tag/create', {user_id: W.user.id, name: name, color: color}, function(data) {
        //parent create
        _this.props.create(data);
        _this.setState({loading: false});
        _this.closeCreateTagLightbox();
    });

  },

  render: function() {

  	return (
    	<div className="tag-create">
    		<p className='tag-create-line'>
    			<a className="button" onClick={this.openCreateTagLightbox}>Create new tag</a>
    		</p>
    		<TagsCreateLightbox ref="lightbox" confirm={this.create} cancel={this.closeCreateTagLightbox} show={this.state.showLightbox} />
    	</div>
    );
  }
});

