import axios from 'axios';
import { baseURL } from '.';
import { getItemFromLocalStorage } from '../utils/localStorage';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL,
});

// Request interceptor to add Authorization header if token exists
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = getItemFromLocalStorage('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Error adding authorization token:', error);
      throw error;
    }
  },
  (error) => {
    // Handle request error
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Error handler function to log and handle errors
export const axiosErrorHandler = (error) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error(
      'Response Error:',
      error.response.data,
      error.response.status
    );
  } else if (error.request) {
    // Request was made but no response received
    console.error('Request Error:', error.request);
  } else {
    // Something else caused an error
    console.error('Error:', error.message);
  }
};

export default axiosInstance;
