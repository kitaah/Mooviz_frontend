import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AiFillCalendar } from 'react-icons/ai';
import { FaUserAlt, FaList } from 'react-icons/fa';
import { MdTitle } from 'react-icons/md';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

function ViewMovie() {
    useEffect(() => {
    document.title = 'Information client 👤';
    loadMovie();
    }, []);

    const [movie, setMovie] = useState({
    title: "",
    year: "",
    director: "",
    category: "",
    });

    const { id } = useParams();

    const loadMovie = async () => {
        const result = await axios.get(`http://localhost:8080/getmovie/${id}`);
        setMovie(result.data);
    };

    return (
    <main>
        <Container>
            <h1 className="text-center mb-5"><FaUserAlt className="pe-3" size={60} />Informations du film</h1>
            <Row>
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow bg-dark">
                    <Card.Body>
                        <Card.Text>
                            <Card.Title className="text-center m-4">{movie.title}</Card.Title>
                            <ul className="list-group list-group-flush rounded">
                                <li className="list-group-item">
                                    <b><MdTitle className="pe-3" size={40} />Titre: </b>
                                    {movie.title}
                                </li>
                                <li className="list-group-item">
                                    <b><AiFillCalendar className="pe-3" size={40} />Année: </b>
                                    {movie.year}
                                </li>
                                <li className="list-group-item">
                                    <b><FaUserAlt className="pe-3" size={40} />Réalisateur: </b>
                                    {movie.director}
                                </li>
                                <li className="list-group-item">
                                    <b><FaList className="pe-3" size={40} />Catégorie: </b>
                                    {movie.category}
                                </li>
                            </ul>
                        </Card.Text>
                    </Card.Body>
                    <div className="text-center">
                        <Link className="btn btn-primary mt-5" to={"/films"}>Retour</Link>
                    </div>
                </div>
            </Row>
        </Container>
    </main>
    )
}

export default ViewMovie