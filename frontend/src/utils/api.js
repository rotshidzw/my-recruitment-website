import axios from 'axios';

// Create an Axios instance with custom configurations
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the base URL based on your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
