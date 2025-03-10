import apiClient from "./apiConfig";

export const registerUser = async (userData: any) => {
  try {
    const response = await apiClient.post(`/user`, userData);
    return response.data;
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    throw error;
  }
};