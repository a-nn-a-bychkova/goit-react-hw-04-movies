import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import PageHeading from '../../components/PageHeading';
import * as moviesAPI from '../../services/movies-api';

export default function HomePage() {
  const { url } = useRouteMatch();
  const [films, setFilms] = useState('');
  useEffect(() => {
    moviesAPI.fetchPupularFilms().then(response => setFilms(response.results));
  }, []);

  return (
    <>
      <PageHeading text="Trending today" />
      {films && (
        <ul>
          {films.map(film => (
            <li key={film.id}>
              <Link to={`${url}/${film.id}`}>
                {film.original_title}
                {film.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
