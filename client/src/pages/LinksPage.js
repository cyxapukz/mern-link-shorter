import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Spinner, Container, Row, Col } from 'react-bootstrap';
import { LinksList } from '../components/LinksList';

export const LinksPage = () => {

  const [links, setLinks] = useState([]);
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null, { Authorization: `Bearer ${token}` });
      setLinks(fetched);
    } catch (error) { }
  }, [token, request]);

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks]);

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
    <>
      {!loading && <LinksList links={links} />}
    </>
  );
};