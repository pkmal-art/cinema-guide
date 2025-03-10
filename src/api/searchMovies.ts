
import apiClient from "./apiConfig";

export const searchMovies = async (title: string) => {
  try {
    const response = await apiClient.get('/movie', {
      params: { title },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка поиска фильма: ', error);
    return [];
  }
};