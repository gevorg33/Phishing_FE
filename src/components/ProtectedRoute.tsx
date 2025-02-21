import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ProtectedRouteProps } from '../types/auth';
import api from "../api/api";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const fetchMe = async () => {
        try {
            const response = await api.get('/user/self');
            console.log(response)
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error fetching me:', error);
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        void fetchMe()
    }, [token]);

    // While checking the authentication status, show a loading state
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // If the user is not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the protected children components
    return children;
};

export default ProtectedRoute;
