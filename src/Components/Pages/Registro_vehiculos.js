import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged ,createUserWithEmailAndPassword} from 'firebase/auth';
import Login from './Login';
import { app, basededatos } from '../../Firebase';
import Swal from 'sweetalert2';
import { onValue, ref, set, update } from 'firebase/database';

import {getFirestore,doc,setDoc} from "firebase/firestore";
import { database } from '../../Firebase';
import { useAuth } from '../../Context/authContext';

export const Registro_vehiculos = () => {
  const {user,logout,loading}=useAuth();
const[vehiculo,setVehiculo]=useState({
  Matricula:'',
  Placas:'',
  Modelo:'',
  Marca:'',
  Tipo:''

})
const handleChange=({target:{name,value}})=>{
  setVehiculo({...vehiculo,[name]:value})
}

const guardarCambios = (e) => {

  setVehiculo({
    ...vehiculo,
      [e.target.name]: e.target.value
  })
}

const limpiar=(e)=>{
  e.target.Matricula.value="";
}

const handleSubmit= async (e)=>{
  e.preventDefault()

  const{Matricula,Placas,Marca,Modelo,Tipo}=vehiculo;
const vacios=( Tipo==="Seleccionar"|| Placas===0 || Marca===0|| Modelo===0|| Matricula===0)
  if(!vacios){
    update(ref(basededatos, 'Vehiculo/' + Matricula), vehiculo).then(() => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Vehiculo Registrado',
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

  document.getElementById("Placas").value = "";

  document.getElementById("Marca").value = "";

  document.getElementById("Modelo").value = "";
 
  document.getElementById("Tipo").value = "Seleccionar";



}

  return (
    <div>
<form onSubmit={handleSubmit}>

<div className="row g-20 align-items-center">
  
<div className="col-auto row">
    <label 
    for="exampleInput1" 
    className="col-form-label">Placas</label>
    </div>
    <div className="col-auto row">
    <input 
    
    className="form-control" 
    id="Placas"
    name="Placas"
    onChange={handleChange} />
    </div>
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
    className="col-form-label">Marca</label>
    </div>
    <div className="col-auto row">
    <input 
    type="text" 
    className="form-control" 
    id="Marca" 
    name="Marca"
    onChange={handleChange} />
    </div>

    <div className="col-auto">
    <label 
    for="exampleInput1" 
    className="col-form-label">Modelo</label>
    </div>
    <div className="col-auto">
    <input 
    type="text" 
    className="form-control" 
    id="Modelo" 
    name="Modelo"
    onChange={handleChange} />
    </div>
    
    <div className="col-auto">
    <label 
    for="exampleInputEmail1" 
    className="col-form-label"> Tipo </label>
    </div>
    <div className="col-auto">
    <select
    type="text" 
    className="form-control" 
    id="Tipo"
    name="Tipo"
    onChange={handleChange}
     >
      <option value="0" onChange={handleChange}> Seleccionar</option>
      
      <option value="Sedan" onChange={handleChange}> Sedan</option>
      <option value="Pick-up" onChange={handleChange}> Pick-up</option>

      <option value="Deportivo" onChange={handleChange}> Deportivo</option>
      <option value="SUV" onChange={handleChange}> SUV</option>

    </select>
    </div>


    

    
    <div className="col-auto">




  

</div>



  <div className="col-4">
    <button 
    type="submit" 
    className="btn btn-primary"
    onClick={handleSubmit}
    >Registrar Vehiculo</button>
    </div>
</div>



  </form>
  </div>
  )
}
export default Registro_vehiculos;