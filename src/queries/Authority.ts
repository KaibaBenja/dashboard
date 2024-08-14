import axios from '@/utils/axiosConfig';

interface AuthoritieBodyData {
    name: string;
    puesto: string;
}

export const AddAuthorities = async (data: AuthoritieBodyData) => {
    try {
        const response = await axios.post('https://gamecenter-backend.vercel.app/api/authorities', data);
        return response.data;
    } catch (error) {
        console.error('Error fetching authorities', error);
        throw error;
    }
};

export const fetchAuthoritie = async (authoritieId: string) => {
    try {
        const response = await axios.get(
            `https://gamecenter-backend.vercel.app/api/games/${authoritieId}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching authoritie ${authoritieId}`, error);
        throw error;
    }
};

export const fetchAuthorities = async () => {
    try {
        const response = await axios.get('https://gamecenter-backend.vercel.app/api/authorities');
        return response.data;
    } catch (error) {
        console.error('Error fetching authorities', error);
        throw error;
    }
};

export const UpdateAuthorities = async (AuthorityId: string, data: AuthoritieBodyData) => {
    try {
        const response = await axios.put(`https://gamecenter-backend.vercel.app/api/authorities/${AuthorityId}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error Updating Authority ${AuthorityId}`, error);
        throw error;
    }
};

export async function deleteAuthority(authorityId: string) {
    try {
        await axios.delete(`https://gamecenter-backend.vercel.app/api/authorities/${authorityId}`);
        console.log(`Authority with ID ${authorityId} deleted successfully`);
    } catch (error) {
        console.error(`Failed to delete authority with ID ${authorityId}:`, error);
        throw error;
    }
}
