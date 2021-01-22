import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    moviesAPI
      .fetchReviews(movieId)
      .then(reviews => setReviews(reviews.results));
  }, [movieId]);

  return (
    <>
      {reviews && reviews.length === 0 && (
        <p>We don't have any reviews for this movie</p>
      )}
      {reviews && (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
