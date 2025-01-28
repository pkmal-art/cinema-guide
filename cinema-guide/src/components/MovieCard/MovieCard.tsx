import React from "react";
import './MovieCard.scss';

type MovieCardProps = {
  title: string;
  posterUrl: string;
};

const MovieCard: React.FC<MovieCardProps> = ({ title, posterUrl }) => {
  return (
    <div className="movie__card">
      <img src={posterUrl} alt={title} className="movie__card--img" />
    </div>
  )
}

export default MovieCard;

