import apiClient from "./apiConfig";

export const fetchMovieDetails = async (movieId: string) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки описания фильма: ', error);
    throw error;
  }
};