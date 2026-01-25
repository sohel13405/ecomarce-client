import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/Firebase.init';

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


 const login = (email,password) =>{
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
 }

 const logOut = () => {
    return signOut(auth)
 }

 const updateUser = (updateData) =>{
    return updateProfile(auth.currentUser,updateData)
 }


  useEffect (()=>{
     const unsubsCribe = onAuthStateChanged(auth, currentUser =>{
        setUser(currentUser)
        setLoading(false)
     })
     return () =>{
        unsubsCribe()
     }
  },[])


const authInfo = {
    createUser,
    login,
    user,
    setUser,
    loading,
    setLoading,
    logOut,
    updateUser

}


    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;