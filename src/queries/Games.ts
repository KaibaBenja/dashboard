import axios from "@/utils/axiosConfig";

export async function deleteGame(gameId: number) {
  try {
    await axios.delete(
      `https://gamecenter-backend.vercel.app/api/games/${gameId}`
    );
    console.log(`Game with ID ${gameId} deleted successfully`);
  } catch (error) {
    console.error(`Failed to delete game with ID ${gameId}:`, error);
    throw error;
  }
}

export const fetchGames = async () => {
  try {
    const response = await axios.get(
      "https://gamecenter-backend.vercel.app/api/games"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching games", error);
    throw error;
  }
};

export const fetchGame = async (id: string) => {
  try {
    const response = await axios.get(
      `https://gamecenter-backend.vercel.app/api/games/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching games", error);
    throw error;
  }
};

export const UpdateGames = async () => {
  try {
    const response = await axios.put(
      "https://gamecenter-backend.vercel.app/api/games"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching games", error);
    throw error;
  }
};

export const AddGames = async () => {
  try {
    const response = await axios.post(
      "https://gamecenter-backend.vercel.app/api/games"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching games", error);
    throw error;
  }
};
