import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export const LinkCard = ({ link }) => {
  return (
    <Container>
      <Row className="row">
        <Col>
          <h2 style={{ marginBottom: '20px' }}>Информация</h2>
          <p>Сокращенная ссылка: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
          <p>Оригинальная ссылка: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
          <p>Количество переходов: <strong>{link.clicks}</strong></p>
          <p>Дата создания: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </Col>
      </Row>
    </Container>
  );
}