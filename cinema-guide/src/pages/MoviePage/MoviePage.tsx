import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetails } from "../../hooks/useMovieDetails";
import Button from "../../components/Button/Button";
import ModalMovie from "../../components/ModalMovie/ModalMovie";
import { formatRuntime } from "../../utils/formatRuntime";
import { getRatingColor } from "../../utils/getRatingColor";
import { IconButtonLike } from "../../components/IconButton/IconButton";
import { formatCurrency } from "../../utils/formatCurrency";
import { postFavoriteMovie } from "../../api/postFavoriteMovie";
import { delFavoriteMovie } from "../../api/delFavoriteMovie";
import { useAuthContext } from "../../contexts/AuthContext";
import ISO6391 from "iso-639-1";
import './MoviePage.scss';

const MoviePage: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const { movie, loading } = useMovieDetails(movieId);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const { user, openLoginModal } = useAuthContext();

  if (loading) {
    return <div>Загрузка...</div>
  }

  const trailerUrl = movie ? `https://www.youtube.com/embed/${movie.trailerYouTubeId}` : '';

  const handleLikeClick = async () => {

    if (!user) {
      openLoginModal(); 
      return;
    }

    if (!movie) return;
  
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
    
    if (!movie) return;
    try {
      await delFavoriteMovie(movie.id); 
      setIsFavorite(false);
      console.log(`Фильм ${movie?.title} удален из избранного.`);
    } catch (error) {
      console.error("Ошибка при удалении из избранного:", error);
    }
  };

  return (
    <div className="container">
      <div className="moviePage__container">
        <div className="moviePage__description">
          <div className="moviePage__info">
            <div className="moviePage__info--rating" 
            style={{ backgroundColor: getRatingColor(Number(movie?.tmdbRating)) }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.00105 12.1733L3.29875 14.8054L4.34897 9.51991L0.392578 5.86118L5.74394 5.22669L8.00105 0.333313L10.2581 5.22669L15.6095 5.86118L11.6531 9.51991L12.7033 14.8054L8.00105 12.1733Z" fill="white" />
              </svg>
              {movie?.tmdbRating}
            </div>
            <div className="moviePage__info--year">
              {movie?.releaseYear}
            </div>

            {movie && movie.genres && movie.genres.length > 0 && (
              <div className="moviePage__info--genre">
                {movie.genres.join(', ')}
              </div>
            )}

            <div className="moviePage__info--runtime">
              {movie?.runtime ? formatRuntime(movie.runtime) : 'Длительность не указана'}
            </div>
          </div>
          
          <h1 className="moviePage__description--title">{movie?.title}</h1>
          <p className="moviePage__description--plot">
            {movie?.plot ? movie.plot.split('.')[0] + '.' : 'Описание недоступно'}
          </p>

          <div className="moviePage__description--actions">
            <div className="moviePage__actions--trailer"> 
              <Button className="moviePage__actions--trailer-button" text="Трейлер" onClick={() => setIsTrailerOpen(true)} />
            </div>
            <div className="actions__like">
              <IconButtonLike
                altText="Like"
                onClick={isFavorite ? handleUnlikeClick : handleLikeClick}
                isActive={isFavorite} 
              />
            </div>        
            
          </div>

        </div>
        <div className="moviePage__img" style={{ backgroundImage: `url(${movie?.backdropUrl})` }}>
        </div>      
          <ModalMovie
            isOpenModalMovie={isTrailerOpen}
            onCloseModalMovie={() => setIsTrailerOpen(false)}
            videoUrl={trailerUrl}
          />
      </div>
      <div className="moviePage__about">
        <h2 className="about__title">О фильме</h2>
        
        {movie?.language && (
          <div className="about__language">
            <div className="about__left">
            <div className="about__language--designation">Язык оригинала</div>
            <div className="about__dottedLine"></div>
            </div>
            <div className="about__language--value">
              {ISO6391.getName(movie.language)}
            </div>            
          </div>
        )}
        

        {movie?.budget && (
          <div className="about__budget">
            <div className="about__left">
            <div className="about__budget--designation">Бюджет</div>
            <div className="about__dottedLine"></div>
            </div>
            <div className="about__budget--value">{formatCurrency(movie.budget)}</div>
          </div>
        )}

        {movie?.revenue && (
          <div className="about__revenue">
            <div className="about__left">
            <div className="about__revenue--designation">Выручка</div>
            <div className="about__dottedLine"></div>
            </div>
            <div className="about__revenue--value">{formatCurrency(movie.revenue)}</div>
          </div>
        )}

        {movie?.director && (
          <div className="about__director">
            <div className="about__left">
            <div className="about__director--designation">Режиссёр</div>
            <div className="about__dottedLine"></div>
            </div>
            <div className="about__director--value">{movie.director}</div>
          </div>
        )}

        {movie?.production && (
          <div className="about__production">
            <div className="about__left">
            <div className="about__production--designation">Продакшен</div>
            <div className="about__dottedLine"></div>
            </div>
            <div className="about__production--value">{movie.production}</div>
          </div>
        )}

        {movie?.awardsSummary && (
          <div className="about__awardsSummary">
            <div className="about__left">
            <div className="about__awardsSummary--designation">Награды</div>
            <div className="about__dottedLine"></div>
            </div>
            <div className="about__awardsSummary--value">{movie.awardsSummary}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MoviePage;



