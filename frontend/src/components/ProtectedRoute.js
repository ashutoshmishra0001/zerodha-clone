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
        // This will redirect the user to the main login page if they are not authenticated
        window.location.href = 'http://localhost:3000/login'; // For local development
        // For production, you would use:
        // window.location.href = process.env.REACT_APP_FRONTEND_URL ? `${process.env.REACT_APP_FRONTEND_URL}/login` : 'http://localhost:3000/login';
        return null;
    }

    return children;
};

export default ProtectedRoute;