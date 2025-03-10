import apiClient from "./apiConfig";

export const postFavoriteMovie = async (movieId: string) => {
  try {
    const response = await apiClient.post(
      `/favorites`,
      new URLSearchParams({ id: movieId }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при добавлении фильма в избранное:", error);
    throw error;
  }
};
