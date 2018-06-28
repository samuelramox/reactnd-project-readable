import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoriesFetchData } from '../../actions/categories';

class Header extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  renderMenu() {
    const { categories = {} } = this.props;
    const menu = { ...categories };
    if (menu.categories !== undefined) {
      return (
        <ul>
          {menu.categories.map(item => (
            <li key={item.name}>
              <Link
                to={{
                  pathname: `/${item.path}`
                }}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      );
    }
    return <span> loading menu ... </span>;
  }
  render() {
    return (
      <section className="header">
        <div className="logo">
          <Link to="/">
            <h1>Projeto Leitura</h1>
          </Link>
        </div>
        <Link to="/admin/post">CREATE NEW POST</Link>
        <nav>{this.renderMenu()}</nav>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories
});

const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(categoriesFetchData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
