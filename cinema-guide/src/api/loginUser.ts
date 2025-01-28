import apiClient from "./apiConfig";

export const loginUser = async (email: string, password: string) => {
  console.log("loginUser: Отправка запроса на авторизацию с данными:", { email, password }); 
  try {
    const response = await apiClient.post(`/auth/login`, {
      email,
      password,
    });
    console.log("loginUser: Ответ от сервера:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Ошибка при авторизации в loginUser:", error); 
    throw error;
  }
};