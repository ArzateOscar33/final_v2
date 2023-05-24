import React from 'react'
import { useState } from 'react';
import { useAuth } from '../../Context/authContext';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged ,createUserWithEmailAndPassword} from 'firebase/auth';

import { app, basededatos } from '../../Firebase';
import Swal from 'sweetalert2';
import { onValue, ref, set, update } from 'firebase/database';

import {getFirestore,doc,setDoc} from "firebase/firestore";
import { database } from '../../Firebase';

export const Login = () => {
const navigate=useNavigate();
const[user,setUser]=useState({
 
  email:'',
  password:'',

})

const {login}= useAuth()
const handleChange=({target:{name,value}})=>{
  setUser({...user,[name]:value})
}

const handleSubmit=e=>{
  e.preventDefault()
  const{email,password}=user;
const vacios=( email.length===0 || password === 0 )
  if(!vacios){
    login(user.email,user.password)
   navigate("/")
  }
  else{

  }
 
}



  return (
    <div>
<form onSubmit={handleSubmit}>

<div className="row g-20 align-items-center">
  



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
    >Login </button>
    </div>
</div>



  </form>
  </div>
  )
}
export default Login;