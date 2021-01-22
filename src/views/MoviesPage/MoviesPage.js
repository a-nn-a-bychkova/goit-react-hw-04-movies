import { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as moviesAPI from '../../services/movies-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesPage(props) {
  const { url } = useRouteMatch();

  const searchQuery = props.searchQuery;
  const [films, setFilms] = useState();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const location = useLocation();

  useEffect(() => {
    console.log('we are on MoviesPage this is currSearchQuery', searchQuery);
    console.log('we are on Movie PAge this is searchQuery', searchQuery);
    if (searchQuery === '') {
      return;
    } else {
      fetchFilms(searchQuery);
    }
  }, [searchQuery]);

  const fetchFilms = searchQuery => {
    moviesAPI
      .fetchFilmsByQuery(searchQuery)
      .then(response => {
        // console.log(response);
        if (response.results.length === 0) {
          return (
            setError(`по запросу ${searchQuery} ничего не найдено`),
            setStatus(Status.REJECTED)
          );
        }

        return setFilms(response.results), setStatus(Status.RESOLVED);
      })
      .catch(error => {
        return setError(error), setStatus(Status.REJECTED);
      });
  };

  if (status === 'idle') {
    return <></>;
  }

  if (status === 'resolved') {
    return (
      <div>
        <ul>
          {films.map(film => (
            <li key={film.id}>
              <Link
                to={{
                  pathname: `${url}/${film.id}`,
                  state: { from: location },
                }}
              >
                {film.original_title}
                {film.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (status === 'rejected') {
    return <h1>{error}</h1>;
  }
}

MoviesPage.propTypes = { searchQuery: PropTypes.string.isRequired };
