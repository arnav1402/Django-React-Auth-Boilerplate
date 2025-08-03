import React, { useState } from 'react';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './pages/Home';
import './App.css'

const App = () => {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'home'

  const handleLoginSuccess = () => {
    setCurrentView('home');
  };

  const handleRegisterSuccess = () => {
    setCurrentView('home');
  };

  const handleSwitchToRegister = () => {
    setCurrentView('register');
  };

  const handleSwitchToLogin = () => {
    setCurrentView('login');
  };

  const handleRedirectToLogin = () => {
    setCurrentView('login');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'register':
        return (
          <Register
            onRegisterSuccess={handleRegisterSuccess}
            onSwitchToLogin={handleSwitchToLogin}
          />
        );
      case 'home':
        return (
          <ProtectedRoute onRedirectToLogin={handleRedirectToLogin}>
            <HomePage />
          </ProtectedRoute>
        );
      case 'login':
      default:
        return (
          <Login
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={handleSwitchToRegister}
          />
        );
    }
  };

  return (
    <AuthProvider>
      <div className="App">
        {renderCurrentView()}
      </div>
    </AuthProvider>
  );
};

export default App;