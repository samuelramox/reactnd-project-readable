import React, { Component } from 'react';
import { connect } from 'react-redux';
import { categoriesFetchData } from '../../actions/categories';

class Categories extends Component {
  componentDidMount() {
    this.props.fetchData();
  }
  render() {
    const { categories = [] } = this.props.categories;
    const { hasErrored, isLoading } = this.props;

    if (hasErrored) {
      return <h1>Error with data</h1>;
    }
    if (isLoading) {
      return <h1>Loading</h1>;
    }
    return (
      <ul>
        {categories.length > 0 &&
          categories.map(category => (
            <li key={category.name}>{category.name}</li>
          ))}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
    isLoading: state.categoriesLoading,
    hasErrored: state.categoriesErrored
  };
};

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(categoriesFetchData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Categories);
