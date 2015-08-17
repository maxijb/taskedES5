var React = require('react');
var Tag = require('./Tag');
module.exports = React.createClass({
  
  componentDidMount: function() {
  },


  render: function() {
    var _this = this;
  	var items = this.props.tags.map(function (item, i) {
      return (
        <Tag tag={item} key={item.id} remove={_this.props.removeTag} select={_this.props.selectTag}/>
      );
    });

    return (
    	<div className="tags-list">
    		{items}
    	</div>
    );
  }
});

