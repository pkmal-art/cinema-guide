import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import MovieCard from "../../components/MovieCard/MovieCard";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { delFavoriteMovie } from "../../api/delFavoriteMovie";
import "./AccountPage.scss";

export default function AccountPage() {
  const { user, favoriteMovies, handleLogout, setFavoriteMovies } = useProfile();
  const [activeTab, setActiveTab] = useState<"favorites" | "account">("favorites");
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate("/");
    navigate(0);
  };

  const handleRemoveFavorite = async (movieId: string) => {
    try {
      await delFavoriteMovie(movieId);
      setFavoriteMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
      console.log(`Фильм с ID ${movieId} удален из избранного.`);
    } catch (error) {
      console.error("Ошибка при удалении из избранного:", error);
    }
  };

  if (!user) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="container">
      <div className="accountPage__container">
        <h1 className="accountPage__title">Мой аккаунт</h1>
        <div className="accountPage__actions">
          <div
            className={`accountPage__actions--link ${activeTab === "favorites" ? "active" : ""}`}
            onClick={() => setActiveTab("favorites")}
          >
            <div className="accountPage__actions--films">Избранные фильмы</div>
          </div>
          <div
            className={`accountPage__actions--link ${activeTab === "account" ? "active" : ""}`}
            onClick={() => setActiveTab("account")}
          >
            <div className="accountPage__actions--info">Настройка аккаунта</div>
          </div>
        </div>

        {activeTab === "account" ? (
          <div className="account__info">
            <div className="info__top">
              <div className="info__circle">{user.name[0].toUpperCase()}{user.surname[0].toUpperCase()}</div>
              <div className="info__fullname">
                <div className="info__fullname--title">Имя Фамилия</div>
                <div className="info__fullname--description">{user.name} {user.surname}</div>
              </div>
            </div>
            <div className="info__bottom">
              <div className="info__circle">
                <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 0C21.5523 0 22 0.44772 22 1V17.0066C22 17.5552 21.5447 18 21.0082 18H2.9918C2.44405 18 2 17.5551 2 17.0066V16H20V4.3L12 11.5L2 2.5V1C2 0.44772 2.44772 0 3 0H21ZM8 12V14H0V12H8ZM5 7V9H0V7H5ZM19.5659 2H4.43414L12 8.8093L19.5659 2Z" fill="white" />
                </svg>
              </div>
              <div className="info__email">
                <div className="info__email--title">Электронная почта</div>
                <div className="info__email--description">{user.email}</div>
              </div>
            </div>
            <Button text="Выйти из аккаунта" onClick={handleLogoutClick} className="account__button--out" />
          </div>
        ) : (
          <>
            {favoriteMovies.length > 0 ? (
              <div className="favoriteMovie__list">
                {favoriteMovies.map((movie) => (
                  <div key={movie.id} className="favoriteMovie__list--item">
                    <div className="favoriteMovie__card">
                      <Link to={`/movie/${movie.id}`}>
                        <MovieCard posterUrl={movie.posterUrl} title={movie.title} />
                      </Link>
                      <div
                        className="favoriteMovie__remove"
                        onClick={() => handleRemoveFavorite(movie.id)}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z" fill="black" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Список избранных фильмов пуст.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
