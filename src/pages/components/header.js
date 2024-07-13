import React from 'react';
import { useAuth } from '../../authprovider';
import { Navbar, Nav, NavDropdown, Image, Badge, Container } from 'react-bootstrap';

const Header = ({ handleLogout }) => {
  const { user } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="main-header">
      <Container>
        <Navbar.Brand href="/dashboard">
          <span className="logo-lg"><b>Toko Aksesoris Komputer</b></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Master" id="layout-options-dropdown">
                <NavDropdown.Item href="/goods" to="#">Goods</NavDropdown.Item>
                <NavDropdown.Item href="#" to="#">Batch</NavDropdown.Item>
                <NavDropdown.Item href="#" to="#">Supplier</NavDropdown.Item>
                <NavDropdown.Item href="#" to="#">Customer</NavDropdown.Item>
                <NavDropdown.Item href="#" to="#">Marketplace</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Sales" id="layout-options-dropdown">
                <NavDropdown.Item href="#" to="#">Delivery Order</NavDropdown.Item>
                <NavDropdown.Item href="#" to="#">Invoice</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title={<>{user.email}</>} id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#" onClick={handleLogout}>Sign out</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Settings</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;