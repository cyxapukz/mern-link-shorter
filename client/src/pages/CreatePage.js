import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Container, Row, Col, Form } from 'react-bootstrap';

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const { request } = useHttp();

  const [link, setLink] = useState('');

  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      try {
        const data = await request('/api/link/generate', 'POST', { from: link }, { Authorization: `Bearer ${auth.token}` });
        history.push(`/detail/${data.link._id}`);
      } catch (error) { }
    }
  }

  return (
    <Container>
      <Row className="row">
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Ссылка</Form.Label>
              <Form.Control placeholder="Вставьте ссылку" id="link" type="text" value={link} onChange={e => setLink(e.target.value)} onKeyPress={pressHandler} />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};