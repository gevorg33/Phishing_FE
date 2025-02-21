import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PhishingSimulation from './components/PhishingSimulation';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from "./components/NotFound";

const App: React.FC = () => {
    const token = localStorage.getItem('token');

    return (
        <Router>
            <Routes>
                {/* Home route: if logged in, redirect to simulation; otherwise, redirect to login */}
                <Route path="/" element={ token ? <Navigate to="/simulation" replace /> : <Navigate to="/login" replace /> } />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/simulation"
                    element={
                        <ProtectedRoute>
                            <PhishingSimulation />
                        </ProtectedRoute>
                    }
                />
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
