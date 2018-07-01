import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import swal from 'sweetalert2';
import uuidv1 from 'uuid/v1';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { PageNotFound } from '../NotFound';
import {
  insertComment,
  commentFetchById,
  updateComment
} from '../../actions/comments';

class HandleComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      update: {
        isUpdate: false,
        updatedValues: false
      },
      body: '',
      author: ''
    };
  }

  componentDidMount() {
    const { match = {} } = this.props;
    const { params = {} } = match;
    if (params.id) {
      this.props.fetchComment(params.id);
      this.setState({
        update: {
          isUpdate: true,
          updatedValues: false
        }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { update } = this.state;
    const { comment } = nextProps;

    if (!update.updatedValues) {
      if (update.isUpdate && comment.body) {
        this.setState({
          update: {
            isUpdate: true,
            updatedValues: true
          },
          body: comment.body,
          author: comment.author
        });
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { match = {}, history } = this.props;
    const { params = {} } = match;
    const { insertComment, updateComment } = this.props;
    const values = serializeForm(e.target, { hash: true });
    let idComment = '';
    if (params.id === undefined) {
      idComment = uuidv1();
      const comment = {
        id: idComment,
        timestamp: Date.now(),
        ...values,
        parentId: params.idPost
      };
      insertComment(comment);
      swal('Success!', 'Comment created with success!', 'success');
    } else {
      idComment = params.id;
      const comment = {
        timestamp: Date.now(),
        ...values
      };
      updateComment(idComment, comment);
      swal('Success!', 'Comment updated with success!', 'success');
    }
    history.goBack();
  };

  handleTextChange = event => {
    const { name } = event.target;
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { update, body, author } = this.state;
    const { fetchError } = this.props;
    const command = update.isUpdate === true ? 'Update' : 'Create';

    if (fetchError) {
      return <PageNotFound />;
    }

    if (update.isUpdate && body === '') {
      return <PageNotFound />;
    }

    return (
      <Row className="mt-5">
        <Col sm="8" xs="10" md="6" ls="6" xl="6" className="m-auto">
          <Form onSubmit={this.handleSubmit} className="d-flex flex-column">
            <FormGroup>
              <Label className="font-weight-bold">Body</Label>
              <Input
                type="textarea"
                name="body"
                value={body}
                onChange={this.handleTextChange}
                required
              />
            </FormGroup>
            {!update.isUpdate && (
              <FormGroup>
                <Label className="font-weight-bold">Author</Label>
                <Input
                  type="text"
                  name="author"
                  value={author}
                  onChange={this.handleTextChange}
                />
              </FormGroup>
            )}
            <Button
              color="success"
              className="align-self-end"
              type="submit"
            >{`${command}`}</Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    comment: state.comment,
    fetchError: state.commentsHasErrored
  };
};

const mapDispatchToProps = dispatch => ({
  fetchComment: idComment => dispatch(commentFetchById(idComment)),
  insertComment: comment => dispatch(insertComment(comment)),
  updateComment: (id, comment) => dispatch(updateComment(id, comment))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(HandleComment));
