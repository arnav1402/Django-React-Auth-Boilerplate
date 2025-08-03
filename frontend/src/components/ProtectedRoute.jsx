import React from 'react';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, onRedirectToLogin }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Call the redirect handler if provided
        if (onRedirectToLogin) {
            onRedirectToLogin();
        }
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
                    <p className="text-gray-600 mb-4">Please log in to access this page.</p>
                    <button
                        onClick={onRedirectToLogin}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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