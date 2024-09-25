import axios from "@/utils/axiosConfig";
import { RequestData } from "@/types/RequestType";

export const UpdateData = async <T>({ path, data }: RequestData<T>, id: string) => {
    try {
        const config = {
            headers: {
                'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
            },
        };

        const response = await axios.put(`${process.env.NEXT_PUBLIC_BACK_URI}/${path}/${id}`, data, config);
        return response.data;
    } catch (error) {
        console.error(`Error updating data in ${path} with ID ${id}`, error);
        throw error;
    }
};