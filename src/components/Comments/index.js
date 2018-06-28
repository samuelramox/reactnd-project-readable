import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../actions/comments';
import { connect } from 'react-redux';

class Comments extends Component {
  onDeleteComment = id => {
    const resultConfirm = window.confirm('Delete this item');
    if (resultConfirm) {
      this.props.deleteComment(id);
    }
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
                  Edit
                </Link>

                <button onClick={() => this.onDeleteComment(comment.id)}>
                  Delete
                </button>

                <div>
                  Author: <b>{comment.author}</b>
                </div>
                <div>
                  <b>{comment.commentCount}</b>Comments
                </div>
                <div>
                  <button> - </button>
                  <b>{comment.voteScore}</b>Votes
                  <button> + </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  deleteComment: idComment => dispatch(deleteComment(idComment))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
