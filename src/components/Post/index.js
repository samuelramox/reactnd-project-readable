import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { commentsFetchData } from '../../actions/comments';
import { postFetchById } from '../../actions/posts';
import Comments from '../Comments';

class Post extends PureComponent {
  componentDidMount() {
    const { match = {} } = this.props;
    const { params = {} } = match;
    const { id } = params;
    this.props.fetchPost(id);
    this.props.fetchComments(id);
  }

  render() {
    const { post, isLoading } = this.props;
    const { match = {} } = this.props;
    const { params = {} } = match;
    const { id } = params;
    if (isLoading) {
      return <h1>Loading...</h1>;
    }
    return (
      <article>
        <h1>{post.title}</h1>
        <div>{post.body}</div>
        <Comments idPost={id} />
      </article>
    );
  }
}

const mapStateToProps = state => {
  return {
    comments: state.comments,
    hasErrored: state.postsErrored,
    isLoading: state.postsLoading,
    post: state.post
  };
};

const mapDispatchToProps = dispatch => ({
  fetchComments: idPost => dispatch(commentsFetchData(idPost)),
  fetchPost: idPost => dispatch(postFetchById(idPost))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
