import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  params: {
    apiKey: import.meta.env.VITE_API_KEY
  },
  timeout: 25000,
  headers: {
    'Content-Type': 'application/json'
  }
});


export default axiosInstance;