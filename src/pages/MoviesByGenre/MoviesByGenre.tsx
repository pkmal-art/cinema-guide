import React from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../../components/MovieCard/MovieCard";
import { genreTranslations } from "../../utils/genreTranslations";
import { useMoviesByGenre } from "../../hooks/useMoviesByGenre";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { Link } from "react-router-dom";
import './MoviesByGenre.scss';


const MoviesByGenre: React.FC = () => {
  const { genre } = useParams<{ genre?: string }>(); 
  const {  movies, isLoading, hasMore, loadMore } = useMoviesByGenre(genre);

  const genreTitle = genre ? genreTranslations[genre] || genre.charAt(0).toUpperCase() + genre.slice(1) : "Жанр не найден";

  useInfiniteScroll({ loadMore, hasMore });

  return (
    <div className="container">
      <div className="moviesByGenre">
        <div className="moviesByGenre__top">
          <div className="moviesByGenre__top--button">
          <Link to="/genres">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.047 20.0012L26.2967 28.2507L23.9397 30.6077L13.333 20.0012L23.9397 9.39453L26.2967 11.7515L18.047 20.0012Z" fill="white" />
          </svg>
          </Link>
          </div>
          <div className="moviesByGenre__top--title">
            <h1 className="moviesByGenre__title">{genreTitle}</h1>
          </div>
        </div>
        
        <div className="moviesByGenre__list">
          {isLoading ? (
            <p>Загрузка фильмов...</p>
          ) : movies.length > 0 ? (
            movies.map((movie, index) => (
              <div key={index} className="moviesByGenre__list--item">
                <Link to={`/movie/${movie.id}`}>
                  <MovieCard posterUrl={movie.posterUrl} title={movie.title} />
                </Link>
              </div>
            ))
          ) : (
            <p>Фильмы данного жанра не найдены.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviesByGenre;
