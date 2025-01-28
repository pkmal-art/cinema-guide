import GenreCard from "../GenreCard/GenreCard";
import { Link } from "react-router-dom";
import { genreTranslations } from "../../utils/genreTranslations";
import { useGenres } from "../../hooks/useGenres";
import './GenreBlock.scss';

const GenreBlock: React.FC = () => {
  const { genres } = useGenres(); 

  const getBackdropUrl = (genre: string) => {
    return `${process.env.PUBLIC_URL}/genres/${genre}.jpg`;
  };

  return (
    <div className="genreBlock">
      <h1 className="genreBlock__title">Жанры фильмов</h1>
      <div className="genreBlock__list">
        {genres.map((genre, index) => (
          <div className="genreBlock__list--item" key={index}>
             <Link to={`/genres/${genre}`}>
             <GenreCard title={genreTranslations[genre] || genre} backdropUrl={getBackdropUrl(genre)} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreBlock;
