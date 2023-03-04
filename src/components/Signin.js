import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { FaUserAlt } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const Signin = () => {
  useEffect(() => {
    document.title = 'Connexion 👤';
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const [validation, setValidation] = useState("");
  
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await signIn(email, password)
      navigate('/accueil')
      setValidation("");
    } catch {
      setValidation("Email et/ou mot de passe incorrect(s) !");
    }
  };

  return (
    <main>
      <Container>
        <h1 className="text-center mb-5"><FaUserAlt className="pe-3" size={60} />Connexion utilisateur</h1>
        <Row>
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 bg-success shadow px-5">
            <p className='text-center fw-bold py-2'>Pas encore de compte?<Link to='/signup' className='text-light underline line-break'>Inscris-toi.</Link></p>
            <Form onSubmit={handleSubmit} className="text-light p-3">
              <p className="text-danger text-light text-center fw-bold">{validation}</p>
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

export default Signin;