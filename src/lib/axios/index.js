import axios from "axios";
import { userStorage } from "../../features/auth/storage";



const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || 'https://api.escuelajs.co/api/v1',
})

export default httpClient;

httpClient.interceptors.request.use((config) => {
    const token = userStorage.get();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

httpClient.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Handle error responses
    if (error.response?.status === 401) {
        // Unauthorized - redirect to login
        userStorage.remove();
        window.location.href = '/login';
    }
    return Promise.reject(error);
});