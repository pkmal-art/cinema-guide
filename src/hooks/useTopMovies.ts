import { useState, useEffect } from "react";
import { fetchTopMovies } from "../api/fetchTopMovies";

type Movie = {
  id: number;
  title: string;
  posterUrl: string;
  language: string;
  budget: string;
  revenue: string;
  director: string;
  production: string;
  awardsSummary: string;
};

export const useTopMovies = () => {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadTopMovies = async () => {
    try {
      const movies = await fetchTopMovies();
      setTopMovies(movies);
    } catch (error) {
      console.error("Ошибка при загрузке топ-10 фильмов: ", error);
    }
  };

  useEffect(() => {
    loadTopMovies();
  }, []);

  return { topMovies };
}

