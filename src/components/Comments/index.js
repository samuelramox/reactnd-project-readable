import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { Button } from 'reactstrap';
import { deleteComment, commentsFetchData } from '../../actions/comments';

const onDeleteComment = async (id, props, history) => {
  const { deleteComment } = props;
  const resultConfirm = window.confirm('Delete this item?');
  if (resultConfirm) {
    await deleteComment(id);
    swal('Success', 'Comment deleted with success!', 'success');
    history.goBack();
  }
};

const Comments = props => {
  const { hasErrored, isLoading, data, idPost, history, post } = props;

  if (hasErrored) {
    return <h1>Error whith fetch data</h1>;
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const parentId = data.length > 0 ? data[0].parentId : '';

  return (
    <div>
      <h2>
        Comments:
        <span className="font-weight-bold text-dark mx-2">{`${
          post.commentCount
        }`}</span>
      </h2>
      <Button
        className="mb-3"
        tag={Link}
        to={`/admin/comment/${idPost}`}
        color="success"
      >
        New comment
      </Button>
      <div>
        {data.map(comment => (
          <div key={comment.id}>
            <hr />
            <div>{comment.body}</div>
            <p className="text-secondary mt-3">
              Author:<span className="font-weight-bold text-dark mx-2">
                {comment.author}
              </span>
            </p>
            <div className="d-flex justify-content-center">
              <Button
                color="info"
                className="btn-md mx-2"
                tag={Link}
                to={`/admin/comment/${parentId}/${comment.id}`}
              >
                Edit
              </Button>
              <Button
                color="danger"
                className="btn-md mx-2"
                onClick={() => onDeleteComment(comment.id, props, history)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.comments,
  isLoading: state.commentsIsLoading,
  hasErrored: state.commentsHasErrored
});

const mapDispatchToProps = dispatch => ({
  deleteComment: idComment => dispatch(deleteComment(idComment)),
  fetchComments: idPost => dispatch(commentsFetchData(idPost))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
