import apiClient from "./apiConfig";

export const fetchRandomMovie = async () => {
  try {
    const response = await apiClient.get('/movie/random');
    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки рандомного фильма: ', error);
    throw error;
  }
};