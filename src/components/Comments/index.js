import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import swal from 'sweetalert2';
import { Button, Card, CardBody, CardFooter, Container } from 'reactstrap';
import { Error, Loading } from '../NotFound';
import { deleteComment, commentsFetchData } from '../../actions/comments';
import { handleVotes } from '../../actions/votes';
import Votes from '../Votes';

class Comments extends Component {
  onDeleteComment = async (id, props, history) => {
    const { deleteComment } = props;
    const resultConfirm = window.confirm('Delete this item?');
    if (resultConfirm) {
      await deleteComment(id);
      swal('Success', 'Comment deleted with success!', 'success');
      history.goBack();
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
    const { hasErrored, isLoading, data, idPost, history, post } = this.props;
    const parentId = data.length > 0 ? data[0].parentId : '';

    if (hasErrored) {
      return <Error />;
    }

    if (isLoading) {
      return <Loading />;
    }

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
            <Card className="shadow-sm mb-2" key={comment.id}>
              <CardBody>{comment.body}</CardBody>
              <CardFooter className="d-flex justify-content-between flex-wrap">
                <p className="text-secondary">
                  Author:<span className="font-weight-bold text-dark mx-2">
                    {comment.author}
                  </span>
                </p>
                <Votes
                  id={comment.id}
                  handleScore={this.handleScore}
                  score={comment.voteScore}
                />
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
                    onClick={() =>
                      this.onDeleteComment(comment.id, this.props, history)
                    }
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
  handleScore: (url, value) => dispatch(handleVotes(url, value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments);
