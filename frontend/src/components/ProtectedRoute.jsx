// ProtectedRoute.jsx
import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/ProtectedRoute.css';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="protected-spinner-container">
                <div className="protected-spinner"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="protected-container">
                <div className="protected-card">
                    <h2 className="error-code">404</h2>
                    <h3 className="error-title">You can’t access this page</h3>
                    <p className="error-desc">This page is protected. Please log in to continue.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="login-btn"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return children;
};

export default ProtectedRoute;
