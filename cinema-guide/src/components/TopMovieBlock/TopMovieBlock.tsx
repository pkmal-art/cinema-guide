import React from "react";
import TopMovieCard from "../TopMovieCard/TopMovieCard";
import { useTopMovies } from "../../hooks/useTopMovies";
import { Link } from "react-router-dom";
import "./TopMovieBlock.scss"; 

const TopMovieBlock: React.FC = () => {
  
  const { topMovies } = useTopMovies();  

  return (
    <div className="topMovie__block">
      <h1 className="topMovie__title">Топ 10 фильмов</h1>
      <div className="topMovie__list">
        {topMovies.map((movie, index) => (          
        <div key={movie.id} className="topMovie__list--item">
          <Link to={`/movie/${movie.id}`}>
            <TopMovieCard
              key={movie.id}
              numerOnList={`${index + 1}`}
              title={movie.title}
              posterUrl={movie.posterUrl}
              />
            </Link>
        </div>          
        ))}
      </div>
    </div>
  );
};

export default TopMovieBlock;
