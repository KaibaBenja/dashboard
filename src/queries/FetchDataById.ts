import axios from "@/utils/axiosConfig";

export const FetchDataById = async (path: string, id: string) => {
  try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URI}/${path}/${id}`);
      return response.data;
  } catch (error) {
      console.error(`Error fetching data from ${path} with ID ${id}`, error);
      throw error;
  }
};