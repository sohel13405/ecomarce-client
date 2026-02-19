import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/Firebase.init';
import axios from 'axios';

const googleProvider = new GoogleAuthProvider()

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

 const logInWithGoogle = () =>{
   setLoading(true)
   return signInWithPopup(auth, googleProvider)
 }

 const updateUser = (name, photo) =>{
    return updateProfile(auth.currentUser,{
      displayName: name,
      photoURL: photo,
    })
 }


  useEffect (()=>{
     const unsubsCribe = onAuthStateChanged(auth, async currentUser =>{
        setUser(currentUser)
        setLoading(false)
      if(currentUser?.email) {
         const userData = {email: currentUser.email}
        await axios.post(`${import.meta.env.VITE_API_URL}/jwt`,userData,{
            withCredentials:true
         })
         .then(res =>{
            console.log(res.data);
         })
         .catch(err =>{
            console.log(err);
         })
      }

     })
     return () =>{
        unsubsCribe()
     }
  },[])

// useEffect(() => {
//    const unsubscribe = onAuthStateChanged(auth, async currentUser => {
//      console.log('CurrentUser-->', currentUser?.email)
//      if (currentUser?.email) {
//        setUser(currentUser)

   
//      } else {
//        setUser(currentUser)
//        await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
//          withCredentials: true,
//        })
//      }
//      setLoading(false)
//    })
//    return () => {
//      return unsubscribe()
//    }
//  }, [])


const authInfo = {
    createUser,
    login,
    user,
    setUser,
    loading,
    setLoading,
    logOut,
    updateUser,
    logInWithGoogle

}


    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;