import { useEffect, useState } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';
import PageHeading from '../../components/PageHeading';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { url } = useRouteMatch();
  const location = useLocation();
  const [films, setFilms] = useState('');
  useEffect(() => {
    moviesAPI.fetchPupularFilms().then(response => setFilms(response.results));
  }, []);

  return (
    <div className={styles.Container}>
      <PageHeading text="Trending today" />
      {films && (
        <ul className={styles.List}>
          {films.map(film => (
            <li key={film.id} className={styles.Item}>
              <Link
                to={{
                  pathname: `${url}movies/${film.id}`,
                  state: { from: location },
                }}
              >
                {film.original_title}
                {film.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
