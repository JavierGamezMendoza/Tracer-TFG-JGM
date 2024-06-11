import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService'


const Logout = ({actualizarUsuario}) => {
    const [authenticated, setAuthenticated] = useState(false);
    
    const isAutenticated = (authenticated) => {
        setAuthenticated(authenticated);
        actualizarUsuario(authenticated);
    };

    useEffect(() => {
        isAutenticated(false);
        authService.logout();
        
    }, [])
    
    return <Navigate to="/login" />;
};

export default Logout;