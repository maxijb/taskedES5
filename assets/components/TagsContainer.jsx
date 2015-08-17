var React = require('react');
var TagsList = require('./TagsList');
var TagsCreate = require('./TagsCreate');
var pubsub = require('./Utils/PubSub');

module.exports = React.createClass({
  
  componentDidMount: function() {
  },

  getInitialState: function() {
	 return {tags: (this.props.tags || null)};
  },

  createTag: function(data) {
    console.log(arguments);
    var tags = this.state.tags;
    tags.push(data);
    this.setState(tags);
  },

  removeTag: function(id) {
    var i, 
        j, 
        tags = this.state.tags;

    //find in array
    for (i = 0; i < tags.length; i++ ) {
        if (tags[i].id == id) {
            j = i;
            break;
        }
    }

    //update state
    tags.splice(j, 1);
    this.setState({tags: tags});

    //delete from database
    $.post('/tag/destroy/' + id);
  },

  selectTag: function(id) {

     pubsub.emit("ACTION:tag-selected", {tag_id: id});

      var i, 
        j, 
        tags = this.state.tags;

      //find in array
      for (i = 0; i < tags.length; i++ ) {
          if (tags[i].id == id) {
              j = i;
              break;
          }
      }

      if (this.activeTagIndex) {
        tags[activeTagIndex].active = 0;
      }
      tags[j].active = true;
      this.setState({tags: tags, activeTagIndex: j});

  },

  render: function() {
    return (
    	<div className="tags-container">
    		<div className='tags-title'>My bookmarks</div>
    		<TagsList tags={this.state.tags} removeTag={this.removeTag} selectTag={this.selectTag}/> 
        <TagsCreate create={this.createTag} />
    	</div>
    );
  }
});

