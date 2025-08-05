// pages/PageNotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
            <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">Sorry, the page you're looking for doesn't exist.</p>
            <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white text-lg px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
                Go to Home
            </button>
        </div>
    );
};

export default PageNotFound;
