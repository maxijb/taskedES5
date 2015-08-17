var React = require('react');
var Tag = require('./Tag');
module.exports = React.createClass({
  
  componentDidMount: function() {
  },

  remove: function(id, event) {
    this.props.remove(id);
    event.preventDefault();
  },

  render: function() {
  	return (
    	<div className="tag" data-id={this.props.tag.id}>
    		<p className='name' onClick={this.props.select.bind(this, this.props.tag.id)}>
    			{this.props.tag.name}
    			<a className="remove-button" onClick={this.remove.bind(this, this.props.tag.id)}>X</a>
    		</p>
    	</div>
    );
  }
});

