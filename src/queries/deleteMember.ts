import axios from '@/utils/axiosConfig';

export async function deleteMember(memberId: number) {
    try {
        await axios.delete(`http://localhost:3000/api/members/${memberId}`);
        console.log(`Member with ID ${memberId} deleted successfully`);
    } catch (error) {
        console.error(`Failed to delete member with ID ${memberId}:`, error);
        throw error;
    }
}

export const fetchMembers = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/members');
        return response.data;
    } catch (error) {
        console.error('Error fetching members', error);
        throw error;
    }
};

export const UpdateMembers = async () => {
    try {
        const response = await axios.put('http://localhost:3000/api/members');
        return response.data;
    } catch (error) {
        console.error('Error fetching members', error);
        throw error;
    }
};

export const AddMembers = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/members');
        return response.data;
    } catch (error) {
        console.error('Error fetching members', error);
        throw error;
    }
};