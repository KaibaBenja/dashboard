import axios from '@/utils/axiosConfig';

interface EventBodyData {
    fecha: string;
    horario: string;
    event_name: string;
    descripcion: string;
}

export const AddEvents = async (data: EventBodyData) => {
    try {
        const response = await axios.post('https://gamecenter-backend.vercel.app/api/events', data);
        return response.data;
    } catch (error) {
        console.error('Error fetching events', error);
        throw error;
    }
};

export const fetchEvent = async (eventId: string) => {
    try {
        const response = await axios.get(
            `https://gamecenter-backend.vercel.app/api/games/${eventId}`
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching event ${eventId}`, error);
        throw error;
    }
};

export const fetchEvents = async () => {
    try {
        const response = await axios.get('https://gamecenter-backend.vercel.app/api/events');
        return response.data;
    } catch (error) {
        console.error('Error fetching events', error);
        throw error;
    }
};

export const UpdateEvents = async (data: EventBodyData) => {
    try {
        const response = await axios.put('https://gamecenter-backend.vercel.app/api/events', data);
        return response.data;
    } catch (error) {
        console.error('Error fetching events', error);
        throw error;
    }
};

export async function deleteEvents(eventId: string) {
    try {
        await axios.delete(`https://gamecenter-backend.vercel.app/api/events/${eventId}`);
        console.log(`Event with ID ${eventId} deleted successfully`);
    } catch (error) {
        console.error(`Failed to delete event with ID ${eventId}:`, error);
        throw error;
    }
}