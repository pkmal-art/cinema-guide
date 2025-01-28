
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import GenrePage from './pages/GenrePage/GenrePage';
import MoviesByGenre from './pages/MoviesByGenre/MoviesByGenre';
import MoviePage from './pages/MoviePage/MoviePage';
import AccountPage from './pages/AccountPage/AccountPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="app__content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/genres" element={<GenrePage />} />
            <Route path="/genres/:genre" element={<MoviesByGenre />} /> 
            <Route path="/movie/:movieId" element={<MoviePage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
