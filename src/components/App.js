import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './AppBar';
import Container from './Container';
import HomePage from '../views/HomePage';
import MoviesPage from '../views/MoviesPage';
import SearchBar from './SearchBar';
import SearchForm from './SearchForm';
import MovieDetailsPage from '../views/MovieDetailsPage/';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <div>
      <Container>
        <AppBar />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies" exact>
            <SearchBar>
              <SearchForm onSubmit={handleFormSubmit} />
            </SearchBar>
            <MoviesPage searchQuery={searchQuery} />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

// '/movies' - компонент <MoviesPage>, страница поиска фильмов по ключевому слову.
// '/movies/:movieId' - компонент <MovieDetailsPage>, страница с детальной информацией о кинофильме.
