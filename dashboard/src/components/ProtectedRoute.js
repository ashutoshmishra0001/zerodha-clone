import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        window.location.href = 'https://zerodha-clone-frontend-dyrl.onrender.com/login';
        return null;
    }

    return children;
};

export default ProtectedRoute;