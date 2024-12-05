import axios from "@/utils/axiosConfig";

export const DeleteManyData = async (path: string, event_name: string) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACK_URI}/${path}/${event_name}`);
        console.log(`Data with event_name ${event_name} deleted successfully from ${path}`);
    } catch (error) {
        console.error(`Failed to delete data with ID ${event_name} from ${path}:`, error);
        throw error;
    }
};