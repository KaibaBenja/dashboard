import axios from '@/utils/axiosConfig';

interface MemberBodyData {
    name_surname: string;
    puesto: string;
    linkedIn: string;
    profile_pic: string;
}

export const AddMembers = async (data: MemberBodyData) => {
    try {
        const response = await axios.post(`${process.env.BACK_URI}/members`, data);
        return response.data;
    } catch (error) {
        console.error('Error trying to add new member', error);
        throw error;
    }
};

export const fetchMember = async (memberId: string) => {
    try {
        const response = await axios.get(
            `${process.env.BACK_URI}/members/${memberId}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching member", error);
        throw error;
    }
};

export const fetchMembers = async () => {
    try {
        const response = await axios.get(`${process.env.BACK_URI}/members`);
        return response.data;
    } catch (error) {
        console.error('Error fetching members', error);
        throw error;
    }
};

export const UpdateMembers = async (memberId: string, data: MemberBodyData) => {
    try {
        await axios.put(`${process.env.BACK_URI}/members/${memberId}`, data);
    } catch (error) {
        console.error(`Error updating member ${memberId}`, error);
        throw error;
    }
};

export async function deleteMember(memberId: string) {
    try {
        await axios.delete(`${process.env.BACK_URI}/members/${memberId}`);
        console.log(`Member with ID ${memberId} deleted successfully`);
    } catch (error) {
        console.error(`Failed to delete member with ID ${memberId}:`, error);
        throw error;
    }
}