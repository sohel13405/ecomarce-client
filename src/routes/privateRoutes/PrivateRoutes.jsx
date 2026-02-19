import React, { use } from 'react';
import { AuthContext } from '../../components/auth/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {

    const {user, loading} = use(AuthContext)
    const location = useLocation()

    if (loading) {
        return <span className="loading loading-spinner text-primary"></span>
    }

    if(!user){
        return <Navigate to='/auth/login' state={location.pathname}></Navigate>
    }


    return children
};

export default PrivateRoutes;