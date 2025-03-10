import apiClient from "./apiConfig";

export const getProfile  = async () => {
  try {
    const response = await apiClient.get(`/profile`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении профиля:', error);
    throw error;
  }
};