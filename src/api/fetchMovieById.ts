import apiClient from "./apiConfig";

export const fetchMovieById = async (movieId: string) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка загрузки фильма по ID: ', error);
    throw error;
  }
};

