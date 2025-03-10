import React from "react";
import './TopMovieCard.scss';

type TopMovieCardProps ={
  numerOnList: string;
  title: string;
  posterUrl: string;
};

const TopMovieCard: React.FC<TopMovieCardProps> = ({ numerOnList, title, posterUrl }) => {
  return (
    <div className="topMovie__card">
      <div className="topMovie__card--number">{numerOnList}</div>
      {posterUrl ? (
        <img src={posterUrl} alt={title} className="topMovie__card--img" />
      ) : (
        <div className="topMovie__card--alt">{title}</div>
      )}
    </div>
  )
}

export default TopMovieCard;