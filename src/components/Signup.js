import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { FaUserAlt } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { createUser } = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createUser(email, password);
    navigate('/')
  };

  return (
    <main>
      <Container>
        <h1 className="text-center mb-5"><FaUserAlt className="pe-3" size={60} />Création de compte</h1>
        <Row>
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 bg-success shadow px-5">
            <p className='text-center fw-bold py-2'>Déjà un compte?{' '}<Link to='/' className='text-light underline line-break'>Connecte toi.</Link></p>
            <Form onSubmit={handleSubmit} className="text-light p-3">
              <Form.Group className="mb-3" controlId="formAddEmail">
                <Form.Label htmlFor="email">Email:</Form.Label>
                <Form.Control type={"email"} placeholder="Email..." name="email" onChange={(e) => setEmail(e.target.value)} required/>
              </Form.Group>
            <Form.Group className="mb-3" controlId="formAddPassword">
              <Form.Label htmlFor="password" >Mot de passe:</Form.Label>
              <Form.Control type={"password"} placeholder="Mot de passe..." name="password" onChange={(e) => setPassword(e.target.value)} required/>
            </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="danger" className="fw-bold mt-3">Connexion</Button>
              </div>
            </Form>
          </div>
        </Row>
      </Container>
    </main>
  );
};

export default Signup;
