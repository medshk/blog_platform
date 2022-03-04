import React from 'react';
import { useAuth } from '../../contexts/authContext';
import { Navigate } from 'react-router-dom'

const ProtectedRouteFromAuthentication = ({children, redireTo}) => {
    const isAuthenticated = useAuth()
    
    return isAuthenticated ? <Navigate to={redireTo} /> : children
}

export default ProtectedRouteFromAuthentication;
