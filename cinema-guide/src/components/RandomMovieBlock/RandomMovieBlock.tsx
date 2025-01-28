
import React, { useState } from "react";
import { useRandomMovie } from "../../hooks/useRandomMovie";
import { delFavoriteMovie } from "../../api/delFavoriteMovie";
import { postFavoriteMovie } from "../../api/postFavoriteMovie";
import Button from "../Button/Button";
import { IconButtonLike, IconButtonReboot } from "../IconButton/IconButton";
import ModalMovie from "../ModalMovie/ModalMovie";
import { formatRuntime } from "../../utils/formatRuntime";
import { getRatingColor } from "../../utils/getRatingColor";
import { Link } from "react-router-dom";
import "./RandomMovieBlock.scss";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const RandomMovieBlock: React.FC = () => {
  const { movie, loading, loadRandomMovie } = useRandomMovie();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const { user, openLoginModal } = useAuthContext(); 

  const trailerUrl = movie ? `https://www.youtube.com/embed/${movie.trailerYouTubeId}` : "";
  const navigate = useNavigate();

  if (loading) {
    return <div>Загрузка фильма...</div>;
  }

  if (!movie) {
    return <div>Фильм не найден</div>;
  }

  const handleLikeClick = async () => {
    if (!user) {
      openLoginModal(); 
      return;
    }

    try {
      await postFavoriteMovie(movie.id);
      setIsFavorite(true);
      console.log(`Фильм "${movie.title}" добавлен в избранное.`);
    } catch (error) {
      console.error("Ошибка при добавлении в избранное:", error);
    }
  };

  const handleUnlikeClick = async () => {
    if (!user) {
      openLoginModal(); 
      return;
    }

    try {
      await delFavoriteMovie(movie.id);
      setIsFavorite(false);
      console.log(`Фильм "${movie.title}" удален из избранного.`);
    } catch (error) {
      console.error("Ошибка при удалении из избранного:", error);
    }
  };

  const handleRefreshClick = async () => {
    try {
      await loadRandomMovie();
      setIsFavorite(false);
    } catch (error) {
      console.error("Ошибка при обновлении фильма:", error);
    }
  };

  return (
    <div className="randomMovie__container">
      <div className="randomMovie__description">
        <div className="randomMovie__info">
          <div
            className="randomMovie__info--rating"
            style={{ backgroundColor: getRatingColor(Number(movie.tmdbRating)) }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.00105 12.1733L3.29875 14.8054L4.34897 9.51991L0.392578 5.86118L5.74394 5.22669L8.00105 0.333313L10.2581 5.22669L15.6095 5.86118L11.6531 9.51991L12.7033 14.8054L8.00105 12.1733Z"
                fill="white"
              />
            </svg>
            {movie.tmdbRating}
          </div>
          <div className="randomMovie__info--year">{movie.releaseYear}</div>
          <div className="randomMovie__info--genre">
            {movie.genres?.length ? movie.genres.slice(0, 2).join(", ") : "Жанр не указан"}
          </div>
          <div className="randomMovie__info--runtime">
            {movie.runtime ? formatRuntime(movie.runtime) : "Длительность не указана"}
          </div>
        </div>

        <h2 className="randomMovie__description--title">{movie.title}</h2>
        <p className="randomMovie__description--plot">
          {movie.plot ? movie.plot.split(".")[0] + "." : "Описание недоступно"}
        </p>

        <div className="randomMovie__description--actions">
          <div className="actions__trailer">
            <Button className="actions__trailer--button" text="Трейлер" onClick={() => setIsTrailerOpen(true)} />
          </div>
          <div className="actions__about">            
            <Button className="actions__about--button" text="О фильме" variant="secondary" onClick={() => navigate(`/movie/${movie.id}`)} />
          </div>
          <div className="actions__like">
            <IconButtonLike
              altText="Like"
              onClick={isFavorite ? handleUnlikeClick : handleLikeClick}
              isActive={isFavorite}
            />
          </div>
          <div className="actions__reboot">
            <IconButtonReboot altText="Refresh" onClick={handleRefreshClick} />
          </div>
        </div>
      </div>
      <div
        className="randomMovie__img"
        style={{ backgroundImage: `url(${movie.backdropUrl})` }}
      ></div>

      <ModalMovie
        isOpenModalMovie={isTrailerOpen}
        onCloseModalMovie={() => setIsTrailerOpen(false)}
        videoUrl={trailerUrl}
      />
    </div>
  );
};

export default RandomMovieBlock;
