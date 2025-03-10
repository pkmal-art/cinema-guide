import apiClient from "./apiConfig";

export const logoutUser = async () => {
  try {
    await apiClient.get(`/auth/logout`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error('Ошибка при выходе из системы:', error);
    throw error;
  }
};