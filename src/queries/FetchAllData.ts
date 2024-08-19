import axios from "@/utils/axiosConfig";

export const FetchAllData = async (path: string) => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URI}/${path}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching all data from ${path}`, error);
        throw error;
    }
};