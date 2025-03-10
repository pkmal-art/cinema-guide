import { useEffect, useState } from "react";
import { fetchGenres } from "../api/fetchGenres";

export const useGenres = () => {
const [genres, setGenres] = useState([]);

  const loadGenres = async () => {
    try {
      const genres = await fetchGenres();
      setGenres(genres);
    } catch (error)  {
      console.error("Ошибка при загрузке жанров: ", error);
    }
  };

  useEffect(() => {
    loadGenres();
  }, []);

  return { genres };
}