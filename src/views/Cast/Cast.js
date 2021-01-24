import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';
import styles from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    moviesAPI.fetchCast(movieId).then(result => setCast(result.cast));
  }, [movieId]);

  return (
    <>
      {cast && (
        <ul className={styles.List}>
          {cast.map(actor => (
            <li key={actor.id}>{actor.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}
