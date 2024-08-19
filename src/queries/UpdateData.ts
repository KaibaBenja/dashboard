import axios from "@/utils/axiosConfig";
import { RequestData } from "@/types/RequestType";

export const UpdateData = async <T>({ path, data }: RequestData<T>, id: string) => {
    try {
        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACK_URI}/${path}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating data in ${path} with ID ${id}`, error);
        throw error;
    }
};