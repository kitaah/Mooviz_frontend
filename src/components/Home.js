import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { MdLocalMovies } from 'react-icons/md';
import AOS from "aos";
import "aos/dist/aos.css";


function Home() {
    const { user } = UserAuth();
    useEffect(() => {
    document.title = 'Accueil utilisateur 👤';
    AOS.init();
    AOS.refresh();
  }, []);
  

  return (

<div data-aos="fade-right" data-aos-delay="100" data-aos-duration="4000">
    <main className="text-center">
        <h1 className="mb-5 px-5">Bienvenue chez Mooviz <span className="line-break">{user && user.email}</span></h1>
        <h2 className="mb-3 px-5">Accède à ta bibliothèque des films !</h2>
        <Link className="btn btn-danger fw-bold text-uppercase border border-warning py-2 my-4 link-to-allmovies" to="/films"><span className="h4">Espace de gestion</span></Link>
        <p className="px-5 h5 pt-3">Accède à l'espace de gestion pour consulter l'ensemble des films</p>
        <p className="px-5 pb-3 h5">Tu pourras également ajouter, consulter, <span className="line-break">modifier ou supprimer un film de ton choix !</span></p>
        <MdLocalMovies size={70} />
    </main>
</div>
  )
}
export default Home