import React, { useState, useEffect } from 'react';
import { useAuth } from '../authprovider';
import supabase from '../supabaseClient';
import Header from './components/header';
import { Container, Card, Button, Row, Col, Table, Modal, Form } from 'react-bootstrap';

const Goods = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    barcode: '',
    category_id: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();

    // Berlangganan perubahan data dari tabel 'products' dengan fitur real-time
    const subscription = supabase.channel('realtime:public:products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
        console.log('Change received!', payload);
        fetchProducts();
      })
      .subscribe();

    // Membersihkan langganan saat komponen dibongkar
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true });
  
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
  
  

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        throw error;
      }

      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error.message);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('products')
        .insert([newProduct]);

      if (error) {
        throw error;
      }

      setShowModal(false);
      setNewProduct({
        name: '',
        price: '',
        barcode: '',
        category_id: ''
      });
    } catch (error) {
      console.error('Error adding product:', error.message);
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
              <Button variant="primary" onClick={() => setShowModal(true)}>Add New Product</Button>
              <Table striped bordered hover style={{ marginTop: '10px' }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Barcode</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.barcode}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </section>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Barcode</Form.Label>
              <Form.Control
                type="text"
                name="barcode"
                value={newProduct.barcode}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                name="category_id"
                value={newProduct.category_id}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
              Add Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Goods;