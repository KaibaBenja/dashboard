// src/config/axiosConfig.ts
import axios from "axios";

// Configura un interceptor para agregar el token a las solicitudes
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      config.headers["access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
