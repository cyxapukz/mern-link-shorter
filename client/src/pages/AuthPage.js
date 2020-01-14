import React, { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export const AuthPage = () => {
  const auth = useContext(AuthContext);

  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();

  const [form, setForm] = useState({
    email: '', password: ''
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]); //message

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (error) { }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
    } catch (error) { }
  }

  return (
    <Container>
      <Row className="row">
        <Col>
          <h3 className="text-center">Сокращение ссылок</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" placeholder="Введите адрес почты" value={form.email} onChange={changeHandler} />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control name="password" type="password" placeholder="Введите пароль" value={form.password} onChange={changeHandler} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={loginHandler} disabled={loading} style={{ marginRight: '15px' }}>Войти</Button>
            <Button variant="secondary" type="submit" onClick={registerHandler} disabled={loading}>Регистрация</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};