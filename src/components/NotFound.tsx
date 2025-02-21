import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/login" className="button" style={{ textDecoration: 'none', color: '#fff', backgroundColor: '#0077cc', padding: '10px 20px', borderRadius: '4px' }}>
                Go to Login
            </Link>
        </div>
    );
};

export default NotFound;
