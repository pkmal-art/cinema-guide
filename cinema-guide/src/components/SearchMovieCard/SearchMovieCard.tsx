import React from "react";
import './SearchMovieCard.scss';
import { getRatingColor } from "../../utils/getRatingColor";
import { formatRuntime } from "../../utils/formatRuntime";

type SearchMovieProps = {

  title: string;
  posterUrl: string;
  tmdbRating: string;
  releaseYear: string;
  genres: [];
  runtime: number;
};

const SearchMovieCard: React.FC<SearchMovieProps> = ({ title, posterUrl, tmdbRating, releaseYear,  genres, runtime}) => {
  return (
    <div className="search__movie">
      <img src={posterUrl} alt={title} className="search__movie--img" />
      <div>
        <div className="search__movie--info">
          <div
            className="search__movie--rating"
            style={{ backgroundColor: getRatingColor(Number(tmdbRating)) }}
            >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_14121_321)">
                <path d="M5.00041 7.60831L2.06148 9.2534L2.71786 5.94994L0.245117 3.66323L3.58972 3.26667L5.00041 0.208313L6.41108 3.26667L9.75566 3.66323L7.28295 5.94994L7.93933 9.2534L5.00041 7.60831Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_14121_321">
                  <rect width="10" height="10" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {Number(tmdbRating).toFixed(1)}
          </div>
          <div className="search__movie--year">{releaseYear}</div>
          <div className="search__movie--genre">
            {genres?.length ? genres.slice(0, 2).join(", ") : "Жанр не указан"}
          </div>
          <div className="search__movie--runtime">
            {runtime ? formatRuntime(runtime) : "Длительность не указана"}
          </div>
        </div>
          <h3 className="search__movie--title">{title}</h3>
      </div>    
    </div>
            
  )
}

export default SearchMovieCard;