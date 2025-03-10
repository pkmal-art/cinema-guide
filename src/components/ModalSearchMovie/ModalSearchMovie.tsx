import React, { useRef, useEffect } from "react";
import InputSearch from "../InputSearch/InputSearch";
import SearchMovieCard from "../SearchMovieCard/SearchMovieCard";
import { Link } from "react-router-dom";
import { useSearchMovies } from "../../hooks/useSearchMovies";
import "./ModalSearchMovie.scss";

type ModalSearchMovieProps = {
  isOpenModalSearch: boolean;
  onCloseModalSearch: () => void;
};

const ModalSearchMovies: React.FC<ModalSearchMovieProps> = ({
  isOpenModalSearch,
  onCloseModalSearch,
}) => {

  const {
    query,
    results,
    isDropdownVisible,
    setQuery,
    setDropdownVisible,
    handleSearch,
  } = useSearchMovies();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  const handleMovieSelect = () => {
    setQuery("");
    setDropdownVisible(false);
    onCloseModalSearch();
  };
  

  const dropdownRef = useRef<HTMLUListElement>(null);


  

  if (!isOpenModalSearch) return null;

  return (
    <div className="modalSearch__overlay" onClick={onCloseModalSearch}>
      <div className="modalSearch__container">
        <div className="modalSearch" onClick={(e) => e.stopPropagation()}>
          <button className="modalSearch__close" onClick={handleMovieSelect}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" fill="white" />
            </svg>
          </button>
          <InputSearch
            placeholder="Найти"
            value={query}
            onChange={handleInputChange}
          />
      

        {isDropdownVisible && (
          <ul className="modalSearch__dropdown" ref={dropdownRef}>
            {results.length > 0 ? (
              results.map((movie) => (
                <Link
                  to={`/movie/${movie.id}`}
                  key={movie.id}
                  onClick={handleMovieSelect}
                >
                  <li className="modalSearch__item">
                    <SearchMovieCard
                      title={movie.title}
                      posterUrl={movie.posterUrl}
                      tmdbRating={movie.tmdbRating}
                      releaseYear={movie.releaseYear}
                      genres={movie.genres}
                      runtime={movie.runtime}
                    />
                  </li>
                </Link>
              ))
            ) : (
              <li className="modalSearch__item">Фильм не найден</li>
            )}
          </ul>
        )}
        </div>
      </div>
      

    </div>
  )
  
};

export default ModalSearchMovies;
