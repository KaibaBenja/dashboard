import axios from '@/utils/axiosConfig';

export async function deleteAuthority(authorityId: number) {
    try {
        await axios.delete(`http://localhost:3000/api/authorities/${authorityId}`);
        console.log(`Authority with ID ${authorityId} deleted successfully`);
    } catch (error) {
        console.error(`Failed to delete authority with ID ${authorityId}:`, error);
        throw error;
    }
}

export const fetchAuthorities = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/authorities');
        return response.data;
    } catch (error) {
        console.error('Error fetching authorities', error);
        throw error;
    }
};

export const UpdateAuthorities = async () => {
    try {
        const response = await axios.put('http://localhost:3000/api/authorities');
        return response.data;
    } catch (error) {
        console.error('Error fetching authorities', error);
        throw error;
    }
};

export const AddAuthorities = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/authorities');
        return response.data;
    } catch (error) {
        console.error('Error fetching authorities', error);
        throw error;
    }
};