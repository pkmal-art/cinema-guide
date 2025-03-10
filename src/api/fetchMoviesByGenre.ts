import apiClient from "./apiConfig";

export const fetchMoviesByGenre = async (genre: string, page: number) => {
  try {
    const response = await apiClient.get(`/movie?genre=${genre}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при загрузке фильмов по жанру: ", error);
    throw error;
  }
};

