import { useState, useEffect } from "react";
import { fetchRandomMovie } from "../api/fetchRandomMovie";

type Movie = {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  trailerYouTubeId: string;
  plot: string;  
  tmdbRating: string;
  releaseYear: string;
  genres: [];
  runtime: number;
};

export const useRandomMovie = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  const loadRandomMovie = async () => {
    setLoading(true);
    try {
      const randomMovieData = await fetchRandomMovie();
      setMovie(randomMovieData);
      
    } catch (error) {
      console.error("Ошибка загрузки случайного фильма: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandomMovie();
  }, []);

  return { movie, loading, loadRandomMovie };
};