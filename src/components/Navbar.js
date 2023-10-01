import React from 'react';
import { Navbar, Nav, NavLink } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">To-Do List</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink href="#">Home</NavLink>
          <NavLink href="#">About</NavLink>
          <NavLink href="#">Contact</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbar;
