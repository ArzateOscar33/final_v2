import React from 'react'
import { useState } from 'react';
import { useAuth } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged ,createUserWithEmailAndPassword} from 'firebase/auth';
import Login from './Login';
import { app, basededatos } from '../../Firebase';
import Swal from 'sweetalert2';
import { onValue, ref, set, update } from 'firebase/database';

import {getFirestore,doc,setDoc} from "firebase/firestore";
import { database } from '../../Firebase';

export const Registro = () => {

const[user,setUser]=useState({
  Matricula:'',
  Apellido_P:'',
  Apellido_M:'',
  Nombre:'',
  email:'',
  password:'',
  Estado:'',
  Rol:'Estudiante',

})

const {signup}= useAuth()
const handleChange=({target:{name,value}})=>{
  setUser({...user,[name]:value})
}

const handleSubmit= async (e)=>{
  e.preventDefault()
  const{Matricula,Apellido_P,Apellido_M,Nombre,email,password,Estado,Rol}=user;
const vacios=(Matricula.length===0 || Apellido_P.length===0 || Nombre.length===0 || Apellido_M.length===0 || email.length===0 || password === 0 || Estado==="Seleccionar")
  if(!vacios){
    await signup(user.email,user.password)
    update(ref(basededatos, 'Usuarios/' + Matricula), user).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario agregado',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
  else{
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ingrese todos los datos',
      showConfirmButton: false,
      timer: 1500
    })
  }
 


  document.getElementById("Matricula").value = "";

  document.getElementById("Apellido_P").value = "";

  document.getElementById("Apellido_M").value = "";

  document.getElementById("Nombre").value = "";
 
  document.getElementById("email").value = " ";
  document.getElementById("password").value = "";
  document.getElementById("Estado").value = "Seleccionar";


}
const[isRegistrando,setIsRegistrando]=useState(false);

  return (
    <div>
<form onSubmit={handleSubmit}>

<div className="row g-20 align-items-center">
  
<div className="col-auto row">
    <label 
    for="exampleInput1" 
    className="col-form-label">Matricula</label>
    </div>
    <div className="col-auto row">
    <input 
    
    className="form-control" 
    id="Matricula"
    name="Matricula"
    onChange={handleChange} />
    </div>


    <div className="col-auto row">
    <label 
    for="exampleInput1" 
    className="col-form-label">Apellido Paterno</label>
    </div>
    <div className="col-auto row">
    <input 
    type="text" 
    className="form-control" 
    id="Apellido_P" 
    name="Apellido_P"
    onChange={handleChange} />
    </div>

    <div className="col-auto">
    <label 
    for="exampleInput1" 
    className="col-form-label">Apellido Materno</label>
    </div>
    <div className="col-auto">
    <input 
    type="text" 
    className="form-control" 
    id="Apellido_M" 
    name="Apellido_M"
    onChange={handleChange} />
    </div>
    <div className="col-auto">
    <label 
    for="exampleInput1" 
    className="col-form-label"> Nombres </label>
    </div>
    <div className="col-auto">
    <input 
    type="text" 
    className="form-control" 
    id="Nombre" 
    name="Nombre"
    onChange={handleChange} />
    </div>

    <div className="col-auto">
    <label 
    for="exampleInputEmail1" 
    className="col-form-label"> Estado </label>
    </div>
    <div className="col-auto">
    <select
    type="text" 
    className="form-control" 
    id="Estado"
    name="Estado"
    onChange={handleChange}
     >
      <option value="0" onChange={handleChange}> Seleccionar</option>
      
      <option value="0" onChange={handleChange}> Activo</option>
      <option value="1" onChange={handleChange}> Inactivo</option>

    </select>
    </div>


    <div className="col-1 ">
      
    <label 
    for="exampleInputEmail1" 
    className="col-form-label">Email address</label>
    </div>
    <div className="col-2">
    <input 
    type="email" 
    className="form-control" 
    id="email" 
    name="email"
    aria-describedby="emailHelp"
    onChange={handleChange} />
   
    </div>

    
    <div className="col-auto">




  

</div>
  <div className="col-auto">
    <label 
    for="inputPassword6" 
    className="col-form-label">Password</label>
  </div>
  <div className="col-auto">
    <input 
    type="password" 
    id="password" 
    name="password"
    className="form-control" 
    aria-describedby="passwordHelpInline"
    onChange={handleChange} />
  </div>
  <div className="col-auto">
    <span 
    id="passwordHelpInline" 

    className="form-text">Debe tener entre 8 y 20 caracteres.
    
    </span>
   
  </div>
  <div className="col-4">
    <button 
    type="submit" 
    className="btn btn-primary"
    onClick={()=>setIsRegistrando(!isRegistrando)}
    >Registrarme</button>
    </div>
</div>



  </form>
  </div>
  )
}
export default Registro;