import React, { Component } from 'react';
import serializeForm from 'form-serialize';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import uuidv1 from 'uuid/v1';
import {
  insertComment,
  commentFetchById,
  updateComment
} from '../../actions/comments';
import NotFound from '../NotFound';

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

    const { match = {} } = this.props;
    const { params = {} } = match;

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

      this.props.insertComment(comment);
    } else {
      idComment = params.id;

      const comment = {
        timestamp: Date.now(),
        ...values
      };

      this.props.updateComment(idComment, comment);
    }
  };

  handleTextChange = event => {
    const { name } = event.target;
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { update, author, body } = this.state;
    const { fetchError } = this.props;
    const command = update.isUpdate === true ? 'Update' : 'Create';

    if (fetchError) {
      return <NotFound />;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Body</label>
          <textarea
            type="content"
            name="body"
            value={body}
            onChange={this.handleTextChange}
          />
        </div>

        {!update.isUpdate && (
          <div>
            <label>Author</label>
            <input
              type="text"
              name="author"
              value={author}
              onChange={this.handleTextChange}
            />
          </div>
        )}
        <button type="submit">{`${command} Comment`}</button>
      </form>
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
