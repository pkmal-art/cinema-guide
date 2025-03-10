import React, { useRef, useEffect, useState } from "react";
import "./SearchMovies.scss";
import InputSearch from "../InputSearch/InputSearch";
import { Link, useLocation } from "react-router-dom"; 
import SearchMovieCard from "../SearchMovieCard/SearchMovieCard";
import { useSearchMovies } from "../../hooks/useSearchMovies";
import ModalSearchMovies from "../ModalSearchMovie/ModalSearchMovie";

const SearchMovies: React.FC = () => {
  const {
    query,
    results,
    isDropdownVisible,
    setQuery,
    setDropdownVisible,
    handleSearch,
  } = useSearchMovies();

  const location = useLocation(); 
  const dropdownRef = useRef<HTMLUListElement>(null);

  const [isModalSearchOpen, setIsModalSearchOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  const handleMovieSelect = () => {
    setQuery("");
    setDropdownVisible(false);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setDropdownVisible(false);
    }
  };

 
  useEffect(() => {
    setQuery(""); 
    setDropdownVisible(false); 
  }, [location.pathname]); 

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="search__movies">
     
      <div className="search__movies--input">
        <InputSearch
          placeholder="Найти"
          value={query}
          onChange={handleInputChange}
        />
      </div>
      
      
      {isDropdownVisible && (
        <ul className="search__movies--dropdown" ref={dropdownRef}>
          {results.length > 0 ? (
            results.map((movie) => (
              <Link
                to={`/movie/${movie.id}`}
                key={movie.id}
                onClick={handleMovieSelect}
              >
                <li className="search__movies--item">
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
            <li className="search__movies--item">Фильм не найден</li>
          )}
        </ul>
      )}

      <ModalSearchMovies
        isOpenModalSearch={isModalSearchOpen}
        onCloseModalSearch={() => setIsModalSearchOpen(false)}
      />
    </div>
  );
};

export default SearchMovies;
