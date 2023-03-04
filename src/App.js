import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import './App.scss';
import React from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from "./components/Home";
import ViewAllMovies from "./components/ViewAllMovies";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";
import ViewMovie from "./components/ViewMovie";
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Header/>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/accueil'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/films'
            element={
              <ProtectedRoute>
                <ViewAllMovies />
              </ProtectedRoute>
            }
          />
          <Route
            path='/ajoutfilm'
            element={
              <ProtectedRoute>
                <AddMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path='/modificationfilm/:id'
            element={
              <ProtectedRoute>
                <EditMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path='/consultationfilm/:id'
            element={
              <ProtectedRoute>
                <ViewMovie />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer/>
      </AuthContextProvider>
    </div>
  );
}
;
export default App;