import { useEffect, useState, lazy, Suspense } from 'react';
import {
  NavLink,
  Route,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';
import styles from './MovieDetailsPage.module.css';
import Loader from '../../components/Loader';
import image from '../../images/film-reels-and-filmstrip-clapper-board.jpg';

const Cast = lazy(() => import('../Cast' /*webpackChunkName:"cast"*/));
const Reviews = lazy(() => import('../Reviews' /*webpackChunkName:"reviews"*/));

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MovieDetailsPage() {
  const { path } = useRouteMatch();
  const { movieId } = useParams();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [movie, setMovie] = useState(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!movieId) {
      return;
    }
    setMovie(null);
    setError(null);
    setStatus(Status.IDLE);
    fetchMovie(movieId);
  }, [movieId]);

  const fetchMovie = movieId => {
    moviesAPI
      .fetchMovieById(movieId)
      .then(response => {
        setMovie(response);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  };

  const goBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {status === 'resolved' && (
        <div className={styles.MainContainer}>
          <button type="button" onClick={goBack} className={styles.Button}>
            Go back
          </button>
          <div className={styles.Container}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              />
            ) : (
              <img src={image} />
            )}

            <div className={styles.Card}>
              <h2>
                {movie.title}({movie.release_date.slice(0, -6)})
              </h2>
              <p>User score: {movie.vote_average} %</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h2>Genres</h2>
              <ul className={styles.List}>
                {movie.genres.map(genre => (
                  <li key={genre.id} className={styles.Item}>
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      <hr />
      {movie && (
        <ul className={styles.NavList}>
          <li>
            <NavLink
              to={{
                pathname: `/movies/${movieId}/cast`,
                state: { from: location },
              }}
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{
                pathname: `/movies/${movieId}/reviews`,
                state: { from: location },
              }}
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      )}
      <hr />
      <Suspense fallback={<Loader />}>
        <Route path={`${path}/cast`}>
          <Cast />
        </Route>
        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
      </Suspense>
      {status === 'rejected' && <h2>{error}</h2>}
    </>
  );
}

// / /movies/:movieId/cast - компонент <Cast>, информация о актерском составе. Рендерится на странице <MovieDetailsPage>.

// /movies/:movieId/reviews - компонент <Reviews>, информация об обзорах. Рендерится на странице <MovieDetailsPage>.
