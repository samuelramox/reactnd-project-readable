import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { postsFetchData, deletePost } from '../../actions/posts';

class Posts extends Component {
  componentDidMount() {
    const category = this.getCategoryName();
    if (this.isRenderedByCategory()) {
      this.props.fetchData(category);
    } else {
      this.props.fetchData();
    }
  }

  isRenderedByCategory = () => {
    return !!this.getCategoryName();
  };

  getCategoryName = () => {
    const { match = {} } = this.props;
    const { params = {} } = match;
    return params.category;
  };

  onDeletePost = async id => {
    const resultConfirm = window.confirm('Delete this item?');
    if (resultConfirm) {
      await this.props.deletePost(id);
      this.props.fetchData();
    }
  };

  render() {
    const { posts, hasErrored, isLoading } = this.props;
    const message = this.getCategoryName()
      ? `List all posts of ${this.getCategoryName()}`
      : 'List all posts';
    if (hasErrored) {
      return <h1>Error with data</h1>;
    }
    if (isLoading) {
      return <h1>Loading</h1>;
    }

    return (
      <div>
        <Link to="/admin/post">Create</Link>
        <h1>{message}</h1>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link
                to={{
                  pathname: `/${post.category}/${post.id}`
                }}
              >
                {post.title}
              </Link>
              <span> - </span>
              <Link to={`/admin/post/${post.id}`}>Edit</Link>
              <button onClick={() => this.onDeletePost(post.id)}>Delete</button>
              <div>
                Author: <strong>{post.author}</strong>
              </div>
              <div>
                Category: <strong> {post.category} </strong>
              </div>
              <div>
                <strong>{post.commentCount}</strong> Comments
              </div>
              <div>
                <button> - </button>
                <strong>{post.voteScore}</strong> Votes
                <button> + </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts,
  hasErrored: state.postsHasErrored,
  isLoading: state.postsIsLoading
});

const mapDispatchToProps = dispatch => ({
  fetchData: idCategory => dispatch(postsFetchData(idCategory)),
  deletePost: idPost => dispatch(deletePost(idPost))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
