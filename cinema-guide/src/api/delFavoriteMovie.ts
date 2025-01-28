import apiClient from "./apiConfig";

export const delFavoriteMovie = async (movieId: string) => {
  try {
    const response = await apiClient.delete(`/favorites/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка удаления фильма из избранного: ', error);
    throw error;
  }
};