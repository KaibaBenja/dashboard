import axios from "@/utils/axiosConfig";

export const DeleteData = async (path: string, id: string) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BACK_URI}/${path}/${id}`);
        console.log(`Data with ID ${id} deleted successfully from ${path}`);
    } catch (error) {
        console.error(`Failed to delete data with ID ${id} from ${path}:`, error);
        throw error;
    }
};