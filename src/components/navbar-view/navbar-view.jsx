import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class NavView extends React.Component {
  constructor (props) {
    super (props)
    console.log('Navbar loaded');
    this.onLoggedOut = this.onLoggedOut.bind(this);
  }
  
  onLoggedOut () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
      movies: []
    });
  }
  
  render () {

    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="d-flex">
      <Navbar.Brand as={Link} to={"/"}>MyFlix
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav variant="pills" className="ml-auto">    
        <Nav.Link as={Link} to={`/users/${this.props.user.Username}`}>Profile</Nav.Link>
        <Nav.Link href="/" onClick={() => { this.onLoggedOut() }}>Log Out</Nav.Link>
      </Nav>
      </Navbar.Collapse>
      </Navbar>
    );
  }
}

let mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies
  }
}

export default connect(mapStateToProps)(NavView);