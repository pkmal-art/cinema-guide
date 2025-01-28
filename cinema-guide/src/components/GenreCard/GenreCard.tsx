import React, { useState } from "react";
import './GenreCard.scss';

type GenreCardProps = {
  title: string;
  backdropUrl?: string;
};

const GenreCard: React.FC<GenreCardProps> = ({ title, backdropUrl }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="genre__card">
      <div className="genre__card--img">
        {!imageError && backdropUrl && (
          <img
            src={backdropUrl}
            alt={title}
            className="genre__card--image"
            onError={() => setImageError(true)} 
          />
        )}
      </div>      
      <div className="genre__card--title">
        <h3>{title.charAt(0).toUpperCase() + title.slice(1)}</h3>
      </div>
    </div>
  )
}

export default GenreCard;