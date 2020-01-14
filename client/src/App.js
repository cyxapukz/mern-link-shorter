import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import { NavbarBS } from './components/NavbarBS';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

function App() {
  const { token, login, logout, userId, ready } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return (
      <Container>
        <Row>
          <Col className="text-center" style={{ margin: '20px' }}>
            <Spinner animation="border" />
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        {isAuthenticated && <NavbarBS />}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
