import api from './api';
import { ACCESS_TOKEN, REFRESH_TOKEN, API_ENDPOINTS } from './constants';

class AuthService {
  // Register user
  async register(userData) {
    try {
      const response = await api.post(API_ENDPOINTS.REGISTER, userData);
      if (response.data.token) {
        this.setTokens(response.data.token);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Login user
  async login(credentials) {
    try {
      const response = await api.post(API_ENDPOINTS.LOGIN, credentials);
      if (response.data.token) {
        this.setTokens(response.data.token);
      }
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get user profile
  async getProfile() {
    try {
      const response = await api.get(API_ENDPOINTS.PROFILE);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await api.post(API_ENDPOINTS.FORGOT_PASSWORD, passwordData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Set tokens in localStorage
  setTokens(tokens) {
    localStorage.setItem(ACCESS_TOKEN, tokens.access);
    localStorage.setItem(REFRESH_TOKEN, tokens.refresh);
  }

  // Get access token
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  // Get refresh token
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getAccessToken();
    if (!token) return false;
    
    try {
      // Decode JWT token to check expiration
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  // Logout user
  logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
  }

  // Handle API errors
  handleError(error) {
    if (error.response?.data) {
      return error.response.data;
    }
    return { error: error.message || 'An error occurred' };
  }
}

export default new AuthService();