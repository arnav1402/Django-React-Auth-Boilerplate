// Home.jsx
import React from 'react';
import { useAuth } from '../components/AuthContext';
import { LogOut, User, Settings, Home as HomeIcon } from 'lucide-react';
import '../styles/Home.css';

const Home = () => {
    const { user, logout, updateProfile } = useAuth();

    const handleLogout = () => logout();

    return (
        <div className="home-container">
            <nav className="home-navbar">
                <div className="navbar-left">
                    <HomeIcon className="icon" />
                    <span className="navbar-title">Dashboard</span>
                </div>
                <div className="navbar-right">
                    <div className="user-info">
                        <User className="icon" />
                        <span>{user?.first_name} {user?.last_name}</span>
                    </div>
                    <button title="Settings">
                        <Settings className="icon" />
                    </button>
                    <button onClick={handleLogout} title="Logout">
                        <LogOut className="icon logout" />
                    </button>
                </div>
            </nav>

            <main className="home-main">
                <section className="welcome-box">
                    <div className="welcome-icon"><User className="icon white" /></div>
                    <div>
                        <h1>Welcome back, {user?.first_name}!</h1>
                        <p>Here's your personalized dashboard</p>
                    </div>
                </section>

                <section className="info-cards">
                    <div className="card">
                        <h3>Profile Information</h3>
                        <div className="profile-info-list">
                            <div className="profile-info-row">
                                <span className="profile-info-label">Email:</span>
                                <span className="profile-info-value">{user?.email}</span>
                            </div>
                            <div className="profile-info-row">
                                <span className="profile-info-label">Full Name:</span>
                                <span className="profile-info-value">{user?.first_name} {user?.last_name}</span>
                            </div>
                            <div className="profile-info-row">
                                <span className="profile-info-label">User ID:</span>
                                <span className="profile-info-value">#{user?.id}</span>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h3>Quick Actions</h3>
                        <button onClick={updateProfile}>
                            <User className="icon" /> Refresh Profile
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
