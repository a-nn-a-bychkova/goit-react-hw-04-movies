import { useEffect, useState } from 'react';
import {
  NavLink,
  Route,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import PageHeading from '../../components/PageHeading';
import * as moviesAPI from '../../services/movies-api';
import Cast from '../Cast';
import Reviews from '../Reviews';
import styles from './MovieDetailsPage.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MovieDetailsPage(props) {
  const { url, path } = useRouteMatch();
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
        console.log(response);

        return setMovie(response), setStatus(Status.RESOLVED);
      })
      .catch(error => {
        return setError(error), setStatus(Status.REJECTED);
      });
  };

  return (
    <>
      {movie && (
        <>
          <button
            type="button"
            onClick={() => history.push(location.state.from)}
          >
            Go back
          </button>
          <div className={styles.Container}>
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
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
        </>
      )}
      <hr />
      {movie && (
        <ul>
          <li>
            <NavLink
              to={`/movies/${movieId}/cast`}
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/movies/${movieId}/reviews`}
              className={styles.link}
              activeClassName={styles.activeLink}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      )}
      <hr />
      <Route path={`${path}/cast`}>
        <Cast />
      </Route>
      <Route path={`${path}/reviews`}>
        <Reviews />
      </Route>
    </>
  );
}

// / /movies/:movieId/cast - компонент <Cast>, информация о актерском составе. Рендерится на странице <MovieDetailsPage>.

// /movies/:movieId/reviews - компонент <Reviews>, информация об обзорах. Рендерится на странице <MovieDetailsPage>.
