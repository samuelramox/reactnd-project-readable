import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { Button, Card, CardBody, CardFooter, Container } from 'reactstrap';
import { deleteComment, commentsFetchData } from '../../actions/comments';
import Votes from '../Votes';

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
      <h3 className="my-3">
        Comments:
        <span className="font-weight-bold text-dark mx-2">{`${
          post.commentCount
        }`}</span>
      </h3>
      <Container>
        {data.map(comment => (
          <Card className="mb-3 shadow-sm" key={comment.id}>
            <CardBody>{comment.body}</CardBody>
            <CardFooter className="d-flex justify-content-between flex-wrap">
              <p className="text-secondary">
                Author:<span className="font-weight-bold text-dark mx-2">
                  {comment.author}
                </span>
              </p>

              <div className="btn-mobile d-flex justify-content-center">
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
            </CardFooter>
          </Card>
        ))}
        <Button tag={Link} to={`/admin/comment/${idPost}`} color="success">
          Add Comment
        </Button>
      </Container>
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
