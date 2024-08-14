import axios from '@/utils/axiosConfig';

export const fetchUsers = async () => {
    try {
        const response = await axios.get('https://gamecenter-backend.vercel.app/api/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching users', error);
        throw error;
    }
};