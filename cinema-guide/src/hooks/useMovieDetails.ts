import { useState, useEffect } from "react";
import { fetchMovieDetails } from "../api/fetchMovieDetails";

type Movie = {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  trailerYouTubeId: string;
  plot: string;
  tmdbRating: string;
  releaseYear: string;
  genres: string[];
  runtime: number;
  language: string;
  budget: string;
  revenue: string;
  director: string;
  production: string;
  awardsSummary: string;
};

export const useMovieDetails = (movieId: string | undefined) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const loadMovieDetails = async () => {
    if (!movieId) return;

    setLoading(true);
    try {
      const movieData = await fetchMovieDetails(movieId);
      setMovie(movieData);
    } catch (error) {
      console.error("Ошибка загрузки данных о фильме: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovieDetails();
  }, [movieId]);

  return { movie, loading, loadMovieDetails };
};