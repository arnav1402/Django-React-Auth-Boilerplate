// Register.jsx
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import { Eye, EyeOff, Mail, Lock, User, UserPlus } from 'lucide-react';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        password2: '',
        tc: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.first_name) newErrors.first_name = 'First name is required';
        if (!formData.last_name) newErrors.last_name = 'Last name is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.password2) newErrors.password2 = 'Please confirm your password';
        if (formData.password !== formData.password2) {
            newErrors.password2 = 'Passwords do not match';
        }
        if (!formData.tc) newErrors.tc = 'You must accept the terms and conditions';
        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setErrors({});

        try {
            await register(formData);
            navigate('/');
        } catch (error) {
            console.error('Registration failed:', error);
            if (error.email) setErrors({ email: error.email[0] });
            else if (error.error) setErrors({ general: error.error });
            else setErrors({ general: 'Registration failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <div className="register-icon">
                        <UserPlus className="icon-white" />
                    </div>
                    <h2>Create Account</h2>
                    <p>Join us today</p>
                </div>

                <div className="register-body">
                    {errors.general && <div className="error-box">{errors.general}</div>}

                    <div className="name-fields">
                        <div className="field">
                            <label htmlFor="first_name">First Name</label>
                            <div className="input-wrapper">
                                <User className="icon" />
                                <input
                                    id="first_name"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    placeholder="First name"
                                    className={errors.first_name ? 'error' : ''}
                                />
                            </div>
                            {errors.first_name && <p className="error-text">{errors.first_name}</p>}
                        </div>

                        <div className="field">
                            <label htmlFor="last_name">Last Name</label>
                            <div className="input-wrapper">
                                <User className="icon" />
                                <input
                                    id="last_name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    placeholder="Last name"
                                    className={errors.last_name ? 'error' : ''}
                                />
                            </div>
                            {errors.last_name && <p className="error-text">{errors.last_name}</p>}
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-wrapper">
                            <Mail className="icon" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className={errors.email ? 'error' : ''}
                            />
                        </div>
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>

                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <Lock className="icon" />
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={errors.password ? 'error' : ''}
                            />
                            <button
                                type="button"
                                className="toggle-icon"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
                            </button>
                        </div>
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>

                    <div className="field">
                        <label htmlFor="password2">Confirm Password</label>
                        <div className="input-wrapper">
                            <Lock className="icon" />
                            <input
                                id="password2"
                                name="password2"
                                type={showPassword2 ? 'text' : 'password'}
                                value={formData.password2}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                className={errors.password2 ? 'error' : ''}
                            />
                            <button
                                type="button"
                                className="toggle-icon"
                                onClick={() => setShowPassword2(!showPassword2)}
                            >
                                {showPassword2 ? <EyeOff className="icon" /> : <Eye className="icon" />}
                            </button>
                        </div>
                        {errors.password2 && <p className="error-text">{errors.password2}</p>}
                    </div>

                    <div className="checkbox-wrapper">
                        <input
                            id="tc"
                            name="tc"
                            type="checkbox"
                            checked={formData.tc}
                            onChange={handleChange}
                        />
                        <label htmlFor="tc">
                            I agree to the <span className="terms">Terms and Conditions</span>
                        </label>
                    </div>
                    {errors.tc && <p className="error-text">{errors.tc}</p>}

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading}
                        className="submit-button"
                    >
                        {loading ? <div className="spinner"></div> : <><UserPlus className="icon" />Create Account</>}
                    </button>

                    <p className="login-link">
                        Already have an account?
                        <button type="button" onClick={() => navigate('/login')}> Sign in here</button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
