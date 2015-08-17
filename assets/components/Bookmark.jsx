var React = require('react');

module.exports = React.createClass({
  
  componentDidMount: function() {
  },

  render: function() {
  	return (
    	<div className="bookmark" data-id={this.props.tag.id}>
    		<p className='name'>
    			<a href={this.props.tag.uri}>{this.props.tag.name}</a>
    		</p>
    	</div>
    );
  }
});

