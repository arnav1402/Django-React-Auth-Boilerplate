// ProtectedRoute.jsx
import React from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="text-center bg-white p-10 rounded-lg shadow-md max-w-md w-full">
                    <h2 className="text-4xl font-extrabold text-red-600 mb-4">404</h2>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">You can’t access this page</h3>
                    <p className="text-gray-600 mb-6">This page is protected. Please log in to continue.</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200"
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
