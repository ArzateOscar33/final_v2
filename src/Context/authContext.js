import { createContext,useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut} from 'firebase/auth';
import {auth} from '../Firebase';
import { firestore } from "../Firebase";
import {getFirestore,doc,setDoc} from "firebase/firestore";


export const authContext=createContext();

export const useAuth=()=>{
const context= useContext(authContext)
return context

}

export  function AuthProvider ({children}){
const[user,setUser]=useState(null);

const [loading,setLoading]=useState(true);

const signup=(email,password)=>{
  const infoUsuario=  createUserWithEmailAndPassword(auth,email,password)
}
const login=async (email,password)=>await signInWithEmailAndPassword(auth,email,password);

useEffect(()=>{
 const  unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
    setUser(currentUser);

  })
  return()=>unsubscribe();
},[]);


const logout=()=>signOut(auth);



    return(
    <authContext.Provider value={{signup,login,user,logout,loading}}>
        {children}
    
    </authContext.Provider>
)
}