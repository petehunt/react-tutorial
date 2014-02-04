/** @jsx React.DOM */

var converter = new Showdown.converter();

var Comment = React.createClass({
  render: function() {
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return (
      <div className="comment">
        <h2 className="commentAuthor">{this.props.author}</h2>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    var req = new XMLHttpRequest();
    req.onload = function(){
      if (req.readyState !== 4 || req.status !== 200) return;
      this.setState({data: JSON.parse(req.responseText)});
    }.bind(this);
    req.open("GET", this.props.url, true);
    req.send();
    // $.ajax({
    //   url: this.props.url,
    //   success: function(data) {
    //     this.setState({data: data});
    //   }.bind(this)
    // });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    comments.push(comment);
    this.setState({data: comments});
    var req = new XMLHttpRequest();
    req.onload = function(){
      if (req.readyState !== 4 || req.status !== 200) return;
      this.setState({data: JSON.parse(req.responseText)});
    }.bind(this);
    req.open("POST", this.props.url, true);
    req.setRequestHeader("Content-type","application/json");
    req.send(JSON.stringify(comment));
    // $.ajax({
    //   url: this.props.url,
    //   type: 'POST',
    //   data: comment,
    //   success: function(data) {
    //     this.setState({data: data});
    //   }.bind(this)
    // });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentWillMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment, index) {
      return <Comment key={index} author={comment.author}>{comment.text}</Comment>;
    });
    return <div className="commentList">{commentNodes}</div>;
  }
});

var CommentForm = React.createClass({
  handleSubmit: function() {
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return false;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

React.renderComponent(
  <CommentBox url="/comments.json" pollInterval={2000} />,
  document.getElementById('container')
);
