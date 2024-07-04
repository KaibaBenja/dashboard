// lib/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(`${API_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
