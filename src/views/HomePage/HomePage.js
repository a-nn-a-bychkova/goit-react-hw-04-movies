import { useEffect, useState } from 'react';
import {
  Link,
  Route,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import PageHeading from '../../components/PageHeading';
import * as moviesAPI from '../../services/movies-api';
import MovieDetailsPage from '../MovieDetailsPage';

export default function HomePage() {
  const { url, path } = useRouteMatch();

  const [films, setFilms] = useState('');
  useEffect(() => {
    moviesAPI.fetchPupularFilms().then(response => setFilms(response.results));
    console.log('films HP', films);
  }, []);

  return (
    <>
      <PageHeading text="Trending today" />
      {films && (
        <ul>
          {films.map(film => (
            <li key={film.id}>
              <Link to={`${url}movies/${film.id}`}>
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
