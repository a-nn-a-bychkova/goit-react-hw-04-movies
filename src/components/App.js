import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppBar from './AppBar';
import Container from './Container';
import Loader from '.././components/Loader';

const HomePage = lazy(() =>
  import('../views/HomePage' /*webpackChunkName:"home-page"*/),
);
const MoviesPage = lazy(() =>
  import('../views/MoviesPage' /*webpackChunkName:"movie-page"*/),
);
const SearchBar = lazy(() =>
  import('./SearchBar' /*webpackChunkName:"search-bar"*/),
);
const SearchForm = lazy(() =>
  import('./SearchForm' /*webpackChunkName:"search-form"*/),
);
const MovieDetailsPage = lazy(() =>
  import(
    '../views/MovieDetailsPage/' /*webpackChunkName:"movie-details-page"*/
  ),
);

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <div>
      <Container>
        <AppBar />
        <Suspense fallback={<Loader />}>
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
        </Suspense>
      </Container>
    </div>
  );
}

// '/movies' - компонент <MoviesPage>, страница поиска фильмов по ключевому слову.
// '/movies/:movieId' - компонент <MovieDetailsPage>, страница с детальной информацией о кинофильме.
