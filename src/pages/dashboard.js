import React from 'react';
import { useAuth } from '../authprovider';
import supabase from '../supabaseClient';
import Header from './components/header';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
  const { user } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signOut();
      //if (error) console.log('Error logging out:', error.message);
    } catch (error) {
      //console.log('Error:', error);
    }
  };

  return (
    <div>
      <Header handleLogout={handleLogout} />
      <Container>
        <section style={{padding: '10px'}}>
          <Row>
            <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default Dashboard;