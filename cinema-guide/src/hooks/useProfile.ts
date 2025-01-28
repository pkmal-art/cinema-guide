import { useEffect, useState } from "react";
import { getProfile } from "../api/getProfile";
import { logoutUser } from "../api/logoutUser";
import { fetchMovieById } from "../api/fetchMovieById";

interface Movie {
  id: string;
  posterUrl: string;
  title: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  favorites: string[];
}

export const useProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

 
  const fetchProfile = async () => {
    try {
      const profile = await getProfile();
      setUser(profile);

      const movies = await Promise.all(
        profile.favorites.map((id: string) => fetchMovieById(id))
      );
      setFavoriteMovies(movies);
    } catch (error) {
      console.error("Ошибка при получении профиля:", error);
    }
  };

 
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Ошибка при выходе из аккаунта:", error);
    }
  };

 
  useEffect(() => {
    fetchProfile();
  }, []);

  return { user, favoriteMovies, setFavoriteMovies, fetchProfile, handleLogout };
};