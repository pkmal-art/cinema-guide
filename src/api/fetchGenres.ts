import apiClient from "./apiConfig";

export const fetchGenres = async () => {
  try {
    const response = await apiClient.get('/movie/genres');
    return response.data;
  } catch (error) {
    console.error('Ошибка загузки данных: ', error);
    throw error;
  }
};
