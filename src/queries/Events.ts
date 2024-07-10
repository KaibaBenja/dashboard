import axios from '@/utils/axiosConfig';

export async function deleteEvents(eventId: number) {
    try {
        await axios.delete(`https://gamecenter-backend.vercel.app/api/events/${eventId}`);
        console.log(`Event with ID ${eventId} deleted successfully`);
    } catch (error) {
        console.error(`Failed to delete event with ID ${eventId}:`, error);
        throw error;
    }
}

export const fetchEvents = async () => {
    try {
        const response = await axios.get('https://gamecenter-backend.vercel.app/api/events');
        return response.data;
    } catch (error) {
        console.error('Error fetching events', error);
        throw error;
    }
};

export const UpdateEvents = async () => {
    try {
        const response = await axios.put('https://gamecenter-backend.vercel.app/api/events');
        return response.data;
    } catch (error) {
        console.error('Error fetching events', error);
        throw error;
    }
};

export const AddEvents = async () => {
    try {
        const response = await axios.post('https://gamecenter-backend.vercel.app/api/events');
        return response.data;
    } catch (error) {
        console.error('Error fetching events', error);
        throw error;
    }
};