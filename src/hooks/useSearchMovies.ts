import { useState, useEffect } from "react";
import { searchMovies } from "../api/searchMovies";

type Movie = {
  id: string;
  title: string;
  posterUrl: string;
  tmdbRating: string;
  releaseYear: string;
  genres: [];
  runtime: number;
};

export const useSearchMovies = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (input: string) => {
    setQuery(input);
    if (input.trim().length > 1) {
      setIsLoading(true);
      const movies = await searchMovies(input);
      setResults(movies);
      setDropdownVisible(true);
      setCurrentPage(1);
      setIsLoading(false);
    } else {
      setResults([]);
      setDropdownVisible(false);
    }
  };



  return {
    query,
    results,
    isDropdownVisible,
    setQuery,
    setDropdownVisible,
    handleSearch,
    currentPage,
    
  };
};
