    import axios from "axios";
    import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
    const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
    });

    // Request interceptor to add token to headers
    api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
    );

    // Response interceptor to handle token refresh
    api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (refreshToken) {
            try {
            const response = await axios.post(`${api.defaults.baseURL}/auth/token/refresh/`, {
                refresh: refreshToken
            });
            
            const newAccessToken = response.data.access;
            localStorage.setItem(ACCESS_TOKEN, newAccessToken);
            
            // Retry the original request with new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
            } catch (refreshError) {
            // Refresh token is invalid, logout user
            localStorage.removeItem(ACCESS_TOKEN);
            localStorage.removeItem(REFRESH_TOKEN);
            window.location.href = '/login';
            }
        } else {
            // No refresh token, redirect to login
            window.location.href = '/login';
        }
        }
        
        return Promise.reject(error);
    }
    );

    export default api;