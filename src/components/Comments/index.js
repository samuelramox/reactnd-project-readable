import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Votes from '../Votes';
import { deleteComment, commentsFetchData } from '../../actions/comments';
import { handleVoteScore } from '../../actions/votes';
import { connect } from 'react-redux';

class Comments extends Component {
  onDeleteComment = async id => {
    const { idPost, deleteComment, fetchComments } = this.props;
    const resultConfirm = window.confirm('Delete this item');
    if (resultConfirm) {
      await deleteComment(id);
      fetchComments(idPost);
    }
  };

  handleScore = async (id, value) => {
    const { idPost, handleScore, fetchComments } = this.props;
    const url = `http://localhost:3001/comments/${id}`;
    const res = { option: value };
    await handleScore(url, res);
    fetchComments(idPost);
  };

  render() {
    const { hasErrored, isLoading, data } = this.props;

    if (hasErrored) {
      return <h1>Error with data</h1>;
    }
    if (isLoading) {
      return <h1>Loading</h1>;
    }

    const parentId = data.length > 0 ? data[0].parentId : '';

    return (
      <div>
        <div>
          <h2>Comments</h2>
          <Link to={`/admin/comment/${parentId}`}>Add comment</Link>
          <ul>
            {data.map(comment => (
              <li key={comment.id}>
                <div>{comment.body}</div>
                <Link to={`/admin/comment/${parentId}/${comment.id}`}>
                  Edit this comment
                </Link>
                <button onClick={() => this.onDeleteComment(comment.id)}>
                  Delete
                </button>
                <div>
                  Author: <b>{comment.author}</b>
                </div>
                <div>
                  <b>{comment.commentCount}</b> Comments
                </div>
                <Votes
                  id={comment.id}
                  handleScore={this.handleScore}
                  score={comment.voteScore}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.comments,
  isLoading: state.commentsIsLoading,
  hasErrored: state.commentsHasErrored
});

const mapDispatchToProps = dispatch => ({
  deleteComment: idComment => dispatch(deleteComment(idComment)),
  fetchComments: idPost => dispatch(commentsFetchData(idPost)),
  handleScore: (url, value) => dispatch(handleVoteScore(url, value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
