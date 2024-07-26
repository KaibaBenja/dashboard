// src/config/axiosConfig.ts
import axios from "axios";
import { parseCookies } from 'nookies';

// Configura un interceptor para agregar el token a las solicitudes
axios.interceptors.request.use(
  (config) => {
    const cookies = parseCookies();
    const token = cookies.token;
    if (token) {
      config.headers["access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
