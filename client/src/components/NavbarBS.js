import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Navbar, Nav } from 'react-bootstrap';

export const NavbarBS = () => {

  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Navbar.Brand href="/">Сокращение ссылок</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/create">Создать</Nav.Link>
          <Nav.Link href="/links">Ссылки</Nav.Link>
          <Nav.Link href="/" onClick={logoutHandler}>Выйти</Nav.Link>
        </Nav>
      </Navbar.Collapse>

    </Navbar>
  );
}