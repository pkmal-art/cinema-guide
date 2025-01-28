import axios from "axios";

const API_BASE_URL = 'https://cinemaguide.skillbox.cc/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export default apiClient;