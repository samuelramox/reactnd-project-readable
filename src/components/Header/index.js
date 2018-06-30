import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { categoriesFetchData } from '../../actions/categories';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const { categories = {} } = this.props;
    const menu = { ...categories };

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand tag={Link} to="/" className="text-uppercase">
            Readable
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto mr-5" navbar>
              {menu.categories &&
                menu.categories.map(item => (
                  <NavItem key={item.name} className="mx-2 text-uppercase">
                    <NavLink
                      key={item.name}
                      tag={Link}
                      to={{
                        pathname: `/${item.path}`
                      }}
                    >
                      {item.name}
                    </NavLink>
                  </NavItem>
                ))}
            </Nav>
            <Button color="success" tag={Link} to="/admin/post">
              Create Post
            </Button>
          </Collapse>
        </Navbar>
      </div>
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
