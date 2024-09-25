import axios from '@/utils/axiosConfig';
import { RequestData } from '@/types/RequestType';

export const AddData = async <T>({ path, data }: RequestData<T>) => {
    try {
        const config = {
            headers: {
                'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
            },
        };

        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URI}/${path}`, data, config);
        return response.data;
    } catch (error) {
        console.error(`Error adding data to ${path}`, error);
        throw error;
    }
};