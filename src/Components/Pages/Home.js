import React from 'react'
import Carrusel from '../Carrusel';
import Footer from '../Footer/Footer';
import { useContext } from 'react';
import { useAuth } from '../../Context/authContext';
import userEvent from '@testing-library/user-event';
import { useAsyncValue, useNavigate } from 'react-router-dom';
export const Home = () => {

 const {user,logout,loading}=useAuth();
 const handleLogout=async ()  =>{
  await logout();
 };




  return (
    <>
    <Carrusel/>
    <h1>Pagina de Inicio</h1>
    <h2>Bienvenido {user.email}</h2>
    <button onClick={handleLogout}>Cerrar Sesion</button>
 
    </>
  )
}
export default Home;