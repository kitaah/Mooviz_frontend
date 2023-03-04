import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaSearch } from 'react-icons/fa';
import { BsFillPlusCircleFill, BsTrashFill } from 'react-icons/bs';
import { MdLocalMovies } from 'react-icons/md';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link, useParams  } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

function ViewAllMovies() {
    const [movies,setMovies] = useState([]);
    useEffect(() => {
    document.title = 'Liste des films 👤';
    loadMovies();
    }, []);

    const[search, setSearch] = useState('');

    const { id } = useParams();

    const loadMovies = async() => {
        const result = await axios.get("http://localhost:8080/getmovies");
        setMovies(result.data);
    }

    const deleteMovie = async (id) => {
        await axios.delete(`http://localhost:8080/deletemovie/${id}`);
        loadMovies();
    };
    
    return (
    <main>
        <Container className="text-center">
            <h1 className="mb-5"><MdLocalMovies className="pe-3" size={65} />Liste des films</h1>
            <Link className="btn btn-primary mb-3" to="/ajoutfilm"><BsFillPlusCircleFill className="me-2" />Ajoute un film</Link>
            <Form className="d-flex align-items-center justify-content-center align-middle my-3">
                <Stack direction="horizontal" gap={3}>
                <FaSearch size={30} />
                <Form.Control onChange={(e) =>setSearch(e.target.value)}  type="search" className="search-bar" placeholder="Cherche un titre..."/>
                </Stack>
            </Form>
            <Table className="table table-hover table-responsive shadow table-light">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titre</th>
                        <th scope="col">Réalisateur</th>
                        <th scope="col">Réalisateur</th>
                        <th scope="col">Catégorie</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
            {
                movies.filter((movie) => {
                    return search.toLowerCase()  === ''
                    ? movie : movie.title.toLowerCase().includes(search);
                }).map((movie, index)=>(
                    <tr>
                        <th scope="row" key={index}>{index+1}</th>
                        <td>{movie.title}</td>
                        <td>{movie.year}</td>
                        <td>{movie.director}</td>
                        <td>{movie.category}</td>
                        <td>
                            <Link className="btn btn-success" to={`/consultationfilm/${movie.id}`} title="Voir"><FaEye size={20} /></Link>
                            <Link className="btn btn-primary my-2 mx-4" to={`/modificationfilm/${movie.id}`} title="Modifier">< FaEdit size={20} /></Link>
                            <Button variant="danger" onClick={() => deleteMovie(movie.id)} title="Supprimer"><BsTrashFill size={20} /></Button>
                        </td>
                    </tr>
                ))
            }
                </tbody>
            </Table>
        </Container>
    </main>
    )
}

export default ViewAllMovies