import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { postsFetchData, deletePost } from '../../actions/posts';

class Posts extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  onDeletePost = async id => {
    const resultConfirm = window.confirm('Delete this item?');
    if (resultConfirm) {
      await this.props.deletePost(id);
      this.props.fetchData();
    }
  };

  render() {
    const { posts, hasErrored, isLoading } = this.props;

    if (hasErrored) {
      return <h1>Error with data</h1>;
    }
    if (isLoading) {
      return <h1>Loading</h1>;
    }
    return (
      <div>
        <Link to="/admin/post">Create</Link>
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link
                to={{
                  pathname: `/posts/${post.id}`
                }}
              >
                {post.title}
              </Link>
              <span> - </span>
              <Link to={`/admin/post/${post.id}`}>Edit</Link>
              <button onClick={() => this.onDeletePost(post.id)}>Delete</button>
              <div>
                Author: <b>{post.author}</b>
              </div>
              <div>
                <b>{post.commentCount}</b>Comments
              </div>
              <div>
                <button> - </button>
                <b>{post.voteScore}</b>Votes
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
  fetchData: () => dispatch(postsFetchData()),
  deletePost: idPost => dispatch(deletePost(idPost))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
