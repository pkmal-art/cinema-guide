import { useEffect, useState, useCallback } from "react";
import { fetchMoviesByGenre } from "../api/fetchMoviesByGenre";

interface Movie {
  id: string;
  posterUrl: string;
  title: string;
}

export const useMoviesByGenre = (genre: string | undefined) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const loadMore = useCallback(async () => {
    if (!hasMore || !genre) return;

    setIsLoading(true);
    try {
      const response = await fetchMoviesByGenre(genre, page);
      if (response.length === 0) {
        setHasMore(false); 
      } else {
        setMovies((prevMovies) => [...prevMovies, ...response]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Ошибка при загрузке фильмов жанра: ", error);
    } finally {
      setIsLoading(false);
    }
  }, [genre, hasMore, page]);

  useEffect(() => {
    if (!genre) return;
   
    setMovies([]);
    setPage(1);
    setHasMore(true);
    setIsLoading(true);
    
  
    const initialLoad = async () => {
      try {
        const response = await fetchMoviesByGenre(genre, 1);
        setMovies(response);
        setPage(2); 
        setHasMore(response.length > 0);
      } catch (error) {
        console.error("Ошибка при начальной загрузке фильмов жанра: ", error);
        setHasMore(false);
      } finally {
        setIsLoading(false);
      }
    };

    initialLoad();
  }, [genre]);

  return { movies, isLoading, hasMore, loadMore };
};
