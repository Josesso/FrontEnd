import axios from 'axios';

export const URL_API = import.meta.env.VITE_URL_API || 'https://backend-jt2r.onrender.com';

const instance = axios.create({
    baseURL: URL_API,
    withCredentials: true
});

export default instance;