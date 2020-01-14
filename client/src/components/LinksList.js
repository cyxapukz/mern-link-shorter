import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Row, Col } from 'react-bootstrap';

export const LinksList = ({ links }) => {
  if (!links.length) {
    return (<p className="center" style={{ marginTop: '20px' }}>Ссылок пока нет</p>);
  }

  return (
    <Container>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>№</th>
                <th>Оригинальная ссылка</th>
                <th>Сокращенная ссылка</th>
                <th>Открыть</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link, index) => {
                return (
                  <tr key={link._id}>
                    <td>{index + 1}</td>
                    <td>{link.from}</td>
                    <td>{link.to}</td>
                    <td><Link to={`/detail/${link._id}`}>Открыть</Link></td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}