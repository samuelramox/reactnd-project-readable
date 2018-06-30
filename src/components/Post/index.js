import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Comments from '../Comments';
import Votes from '../Votes';
import NotFound from '../NotFound';
import { commentsFetchData } from '../../actions/comments';
import { postFetchById, deletePost } from '../../actions/posts';
import { handleVotes } from '../../actions/votes';

class Post extends PureComponent {
  componentDidMount() {
    const id = this.getIdPost();
    const { fetchPost, fetchComments } = this.props;
    fetchPost(id);
    fetchComments(id);
  }

  getIdPost() {
    const { match = {} } = this.props;
    const { params = {} } = match;
    const { id } = params;
    return id;
  }

  onDeletePost = async id => {
    const { history } = this.props;
    const resultConfirm = window.confirm(
      'Are you sure you want to delete this item?'
    );
    if (resultConfirm) {
      await this.props.deletePost(id);
      history.push('/');
    }
  };

  handleScore = async (id, value) => {
    const { handleScore, fetchPost } = this.props;
    const url = `http://localhost:3001/posts/${id}`;
    const res = { option: value };
    await handleScore(url, res);
    fetchPost(id);
  };

  render() {
    const { post, isLoading, history } = this.props;
    const { match = {} } = this.props;
    const { params = {} } = match;
    const { id } = params;
    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    if (post.title === undefined) {
      return <NotFound />;
    }
    return (
      <article className="text-center text-capitalize text-secondary my-4">
        <h1>{post.title}</h1>
        <p className="my-5">{post.body}</p>
        <Votes
          id={post.id}
          handleScore={this.handleScore}
          score={post.voteScore}
        />
        <Button
          color="info"
          className="btn-md mx-2 my-4"
          tag={Link}
          to={`/admin/post/${post.id}`}
        >
          Edit
        </Button>
        <Button
          color="danger"
          className="btn-md mx-2 my-4"
          onClick={() => this.onDeletePost(post.id)}
        >
          Delete
        </Button>
        <Comments idPost={id} history={history} post={post} />
      </article>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments,
    hasErrored: state.postsHasErrored,
    isLoading: state.postsIsLoading,
    post: state.post
  };
};

const mapDispatchToProps = dispatch => ({
  fetchComments: idPost => dispatch(commentsFetchData(idPost)),
  fetchPost: idPost => dispatch(postFetchById(idPost)),
  deletePost: idPost => dispatch(deletePost(idPost)),
  handleScore: (url, value) => dispatch(handleVotes(url, value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
