import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Votes from '../Votes';
import { postsFetchData, deletePost, handleSort } from '../../actions/posts';
import { handleVotes } from '../../actions/votes';
import {
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  Button,
  Row,
  Col,
  Container
} from 'reactstrap';
import { Loading, Error } from '../NotFound';

class Posts extends Component {
  componentDidMount() {
    this.listPosts();
  }

  componentWillReceiveProps(nextProps) {
    const { match = {} } = nextProps;
    const { params = {} } = match;
    const changedRouteCategory = params.category;
    const actualCategory = this.getCategoryName();
    if (changedRouteCategory !== actualCategory) {
      this.props.fetchData(changedRouteCategory);
    }
  }

  listPosts = () => {
    const category = this.getCategoryName();
    if (this.isRenderedByCategory()) {
      this.props.fetchData(category);
    } else {
      this.props.fetchData();
    }
  };

  isRenderedByCategory = () => {
    return !!this.getCategoryName();
  };

  getCategoryName = () => {
    const { match = {} } = this.props;
    const { params = {} } = match;
    return params.category;
  };

  onDeletePost = async id => {
    const resultConfirm = window.confirm(
      'Are You Sure you want to Delete this item?'
    );
    if (resultConfirm) {
      await this.props.deletePost(id);
      this.props.fetchData();
    }
  };

  handleScore = async (id, value) => {
    const { handleScore } = this.props;
    const url = `http://localhost:3001/posts/${id}`;
    const res = { option: value };
    await handleScore(url, res);
    this.listPosts();
  };

  handleSort = sortBy => {
    return e => {
      this.props.handleSort(sortBy);
    };
  };

  render() {
    const { posts, hasErrored, isLoading } = this.props;
    const message = this.getCategoryName() ? true : false;

    if (hasErrored) {
      return <Error />;
    }

    if (isLoading) {
      return <Loading />;
    }

    return (
      <div>
        {message && (
          <div className="text-center text-capitalize text-secondary my-4">
            <h1>Posts Category: {this.getCategoryName()}</h1>
          </div>
        )}
        <div className="text-center text-secondary my-4">
          <h4>Order by: </h4>
          <Button
            color="info"
            className="btn-md m-2"
            onClick={this.handleSort('timestamp')}
          >
            Data
          </Button>
          <Button
            color="info"
            className="btn-md m-2"
            onClick={this.handleSort('voteScore')}
          >
            Score
          </Button>
        </div>
        <Container>
          <Row>
            {posts.map(post => (
              <Col sm="12" xs="12" md="6" ls="6" xl="6" key={post.id}>
                <Card className="card-height mb-3 shadow-sm">
                  <CardTitle
                    className="h4 text-center mt-3"
                    tag={Link}
                    to={{
                      pathname: `/${post.category}/${post.id}`
                    }}
                  >
                    {post.title}
                  </CardTitle>
                  <CardBody className="font-weight-bold">
                    <p className="text-secondary">
                      Author:
                      <span className="text-dark m-2">{post.author}</span>
                    </p>
                    <p className="text-secondary">
                      Category:<span className="text-dark m-2">
                        {post.category}
                      </span>
                    </p>
                    <p className="text-secondary">
                      Comments:<span className="text-dark m-2">
                        {post.commentCount}
                      </span>
                    </p>
                    <Votes
                      id={post.id}
                      handleScore={this.handleScore}
                      score={post.voteScore}
                    />
                  </CardBody>
                  <CardFooter className="d-flex justify-content-center">
                    <Button
                      color="info"
                      className="btn-md mx-3"
                      tag={Link}
                      to={`/admin/post/${post.id}`}
                    >
                      Edit
                    </Button>
                    <Button
                      color="danger"
                      className="btn-md mx-3"
                      onClick={() => this.onDeletePost(post.id)}
                    >
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
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
  fetchData: idCategory => dispatch(postsFetchData(idCategory)),
  deletePost: idPost => dispatch(deletePost(idPost)),
  handleScore: (url, value) => dispatch(handleVotes(url, value)),
  handleSort: sortBy => dispatch(handleSort(sortBy))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
