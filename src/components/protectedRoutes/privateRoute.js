import React from 'react';
import { useAuth } from '../../contexts/authContext';
import { Navigate } from 'react-router-dom'

const Privateroute = ({ children , redireTo}) => {
    const isAuthenticated = useAuth()
    
    return isAuthenticated ? children : <Navigate to={redireTo}/>

}

export default Privateroute;
