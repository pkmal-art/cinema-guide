import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import SearchMovies from '../SearchMovies/SearchMovies';
import ModalSearchMovies from '../ModalSearchMovie/ModalSearchMovie';
import AuthModal from '../AuthModal/AuthModal';

const Header: React.FC = () => {
  const [isModalSearchOpen, setIsModalSearchOpen] = useState(false);

  return (
    <div className="header__container">
      <div className="header__logo">
        <NavLink to="/">
          <img src="/logo.svg" alt="logo" />
        </NavLink>
      </div>
      <div className="header__center">
        <nav className="navigation">
          <ul>
            <li className="navigation__item navigation__item--home">
              <NavLink to="/" >
                Главная
              </NavLink>
            </li>
            <li className="navigation__item navigation__item--genres">
              <NavLink to="/genres" >
                <img src="/genres.svg" alt="Genres" className="genres__icon" />
                <span className="genres__text">Жанры</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header__search">
          <div className="search__movies--icon" onClick={() => setIsModalSearchOpen(true)}>
              <img src="/searchWhite.svg" alt="search" className="search__icon" />
          </div>
          <div className="search__container">            
            <SearchMovies />
          </div>
        </div>
      </div>

      <div className="header__login">
        <AuthModal />
      </div>

      <ModalSearchMovies
        isOpenModalSearch={isModalSearchOpen}
        onCloseModalSearch={() => setIsModalSearchOpen(false)}
      />
    </div>
  );
};

export default Header;
