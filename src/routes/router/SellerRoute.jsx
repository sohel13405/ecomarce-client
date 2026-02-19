

import { Navigate } from 'react-router';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import useRole from '../../hooks/useRole';

const SelleRoute = ({children}) => {



    const [role, isRoleLoading] = useRole()

if(isRoleLoading) return <LoadingSpinner></LoadingSpinner>
if (role === 'seller') return children


    return  <Navigate to='/'></Navigate>
};

export default SelleRoute;