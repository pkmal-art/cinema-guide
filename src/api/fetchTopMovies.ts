import apiClient from "./apiConfig";

export const fetchTopMovies = async () => {
  try {
    const response = await apiClient.get('/movie/top10');
    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки топ фильмов: ', error);
    throw error;
  }
};