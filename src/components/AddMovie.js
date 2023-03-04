import axios from "axios";
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { MdLocalMovies } from 'react-icons/md';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function AddMovie() {
  useEffect(() => {
    document.title = 'Ajouter un film 👤';
    loadCategories();
  }, []);

  let navigate = useNavigate();

  const [categories,setCategories] = useState([]);

  const [movie, setMovie] = useState({
    title: "",
    year: "",
    director: "",
    category: "",
  });

  const { title, year, director, category } = movie;

  const onInputChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/addmovie", movie);
    navigate("/films");
  };

  const loadCategories = async () => {
    const result = await axios.get("http://localhost:8080/getcategories");
    setCategories(result.data);
  };

  return (
    <main>
      <Container>
        <h1 className="text-center mb-5"><MdLocalMovies className="pe-3" size={60} />Ajoute un film</h1>
        <Row>
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 bg-dark shadow px-5">
            <Form onSubmit={handleSubmit} className="text-light p-3">
              <Form.Group className="mb-3" controlId="formAddTitle">
                <Form.Label htmlFor="title">Titre:</Form.Label>
                <Form.Control type={"text"} placeholder="Titre..." name="title" defaultValue={title} onChange={onInputChange} required/>
              </Form.Group>
            <Form.Group className="mb-3" controlId="formAddYear">
              <Form.Label htmlFor="year" >Année:</Form.Label>
              <Form.Control type={"text"} placeholder="Année..." name="year" defaultValue={year} onChange={onInputChange} required/>
            </Form.Group>
              <Form.Group className="mb-3" controlId="formAddDirector">
                <Form.Label htmlFor="director">Réalisateur:</Form.Label>
                <Form.Control type={"text"} placeholder="Réalisateur..." name="director" defaultValue={director} onChange={onInputChange} required/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEditCategory">
                <Form.Label htmlFor="category">Catégorie:</Form.Label>
                    <Form.Select name="category" defaultValue={category} onChange={onInputChange}>
                      <option value="">-- Sélectionner la catégorie --</option>
                      {categories.map((category) => (
                      <option value={category.name}>{category.name}</option>))}
                    </Form.Select>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button type="submit" variant="danger" className="fw-bold mt-3">Envoyer</Button>
              </div>
            </Form>
          </div>
        </Row>
        <div className="text-center">
        <Link className="btn btn-primary mt-5 px-5" to="/films">
            <BsFillArrowLeftCircleFill className="h1 align-middle"/>
        </Link>
        </div>
      </Container>
    </main>
  );
}

export default AddMovie