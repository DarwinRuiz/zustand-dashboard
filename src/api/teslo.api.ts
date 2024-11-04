import axios from 'axios';
import { useAuthStore } from '../stores';

const tesloAPI = axios.create({
    baseURL: 'http://localhost:3000/api',
});


//TODO: Add interceptors for request and response
tesloAPI.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
})

export {
    tesloAPI
}