import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { LinkCard } from '../components/LinkCard';

export const DetailPage = () => {

  const { token } = useContext(AuthContext);

  const { request, loading } = useHttp();

  const [link, setLink] = useState(null);
  const linkId = useParams().id;

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, { Authorization: `Bearer ${token}` });
      setLink(fetched);
    } catch (error) { }
  }, [token, linkId, request]);

  useEffect(() => {
    getLink()
  }, [getLink]);

  if (loading) {
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
    <div>
      {!loading && link && <LinkCard link={link} />}
    </div>
  );
};