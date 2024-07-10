import axios from '@/utils/axiosConfig';

export async function deleteEvents(eventId: number) {
    try {
        await axios.delete(`http://localhost:3000/api/events/${eventId}`);
        console.log(`Event with ID ${eventId} deleted successfully`);
    } catch (error) {
        console.error(`Failed to delete event with ID ${eventId}:`, error);
        throw error;
    }
}

export const fetchEvents = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/events');
        return response.data;
    } catch (error) {
        console.error('Error fetching events', error);
        throw error;
    }
};

export const UpdateEvents = async () => {
    try {
        const response = await axios.put('http://localhost:3000/api/events');
        return response.data;
    } catch (error) {
        console.error('Error fetching events', error);
        throw error;
    }
};

export const AddEvents = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/events');
        return response.data;
    } catch (error) {
        console.error('Error fetching events', error);
        throw error;
    }
};