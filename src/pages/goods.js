import React, { useState, useEffect } from 'react';
import { useAuth } from '../authprovider';
import supabase from '../supabaseClient';
import Header from './components/header';
import { Container, Card, Button, Row, Col, Table } from 'react-bootstrap';

const Goods = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) {
        throw error;
      }

      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.log('Error logging out:', error.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Header handleLogout={handleLogout} />
      <Container>
        <section style={{ padding: '10px' }}>
          <Row>
            <Col>
              <h5>Goods List</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default Goods;