import axios from "@/utils/axiosConfig";

interface GameBodyData {
  titulo: string;
  autor: string;
  sinopsis: string;
  aporte_turismo: string;
  aporte_cultura: string;
  aporte_juventud: string;
  aporte_educacion: string;
  objetivo: string;
  desarrollo: string;
  condiciones: string;
  controles: string;
  caracteristicas: string;
  tecnologias: string;
  estilo: string;
  genero: string;
  game_images: string;
}

export const AddGame = async (data: GameBodyData) => {
  try {
    const response = await axios.post(
      "https://gamecenter-backend.vercel.app/api/games",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching games", error);
    throw error;
  }
};

export const fetchGame = async (gameId: string) => {
  try {
    const response = await axios.get(
      `https://gamecenter-backend.vercel.app/api/games/${gameId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching games ${gameId}`, error);
    throw error;
  }
};

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

export const UpdateGame = async (gameId: string, data: GameBodyData) => {
  try {
    const response = await axios.put(
      `https://gamecenter-backend.vercel.app/api/games/${gameId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching game ${gameId}`, error);
    throw error;
  }
};

export async function deleteGame(gameId: string) {
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
