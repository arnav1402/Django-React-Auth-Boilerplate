// Login.jsx
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import '../styles/Login.css';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async () => {
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await login(formData);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.errors?.['non-field errors'] || error.error || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-icon">
                        <LogIn className="icon-white" />
                    </div>
                    <h2>Welcome Back</h2>
                    <p>Sign in to your account</p>
                </div>

                <div className="login-body">
                    {error && <div className="error-box">{error}</div>}

                    <div className="field">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="icon" />
                            <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="Enter your email" />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <Lock className="icon" />
                            <input id="password" name="password" type={showPassword ? 'text' : 'password'} required value={formData.password} onChange={handleChange} placeholder="Enter your password" />
                            <button type="button" className="toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
                            </button>
                        </div>
                    </div>

                    <button type="button" onClick={handleSubmit} disabled={loading} className="submit-button">
                        {loading ? <div className="spinner"></div> : <><LogIn className="icon" />Sign In</>}
                    </button>

                    <p className="register-link">
                        Don't have an account?
                        <button type="button" onClick={() => navigate('/register')}> Sign up here</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
