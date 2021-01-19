import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../../services/movies-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesPage(props) {
  const { filmId } = useParams();
  const [films, setFilms] = useState();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [searchQuery, setSearchQuery] = useState(props.searchQuery);

  useEffect(() => {
    moviesAPI
      .fetchFilmsByQuery(searchQuery)
      .then(response => console.log(response));
  }, [searchQuery]);
  return <h2>Here will be list of films</h2>;
}

// export default function ImageGallery(props) {
//   const [images, setImages] = useState([]);
//   const [error, setError] = useState(null);
//   const [status, setStatus] = useState(Status.IDLE);
//   const [page, setPage] = useState(1);
//   const searchQuery = props.searchQuery;

//   useEffect(() => {
//     if (searchQuery === '') {
//       return;
//     }
//
//   }, [searchQuery]);

//   useEffect(() => {
//     if (page === 1) {
//       return;
//     }
//     fetchImages(searchQuery, page);
//   }, [page]);

//   const fetchImages = (currentSearchQuery, page) => {
//     setStatus(Status.PENDING);
//     imageAPI
//       .fetchImage(currentSearchQuery, page)
//       .then(newImages => {
//         if (newImages.hits.length === 0 && page === 1) {
//           return (
//             setError(`по запросу ${currentSearchQuery} ничего не найдено`),
//             setStatus(Status.REJECTED)
//           );
//         } else if (newImages.hits.length === 0 && page > 1) {
//           return setStatus(Status.RESOLVED);
//         }
//         return (
//           setImages(images => [...images, ...newImages.hits]),
//           setStatus(Status.RESOLVED),
//           window.scrollTo({
//             top: document.documentElement.scrollHeight,
//             behavior: 'smooth',
//           })
//         );
//       })
//       .catch(error => {
//         return setError(error), setStatus(Status.REJECTED);
//       });
//   };

//   const changePageNumber = page => {
//     setPage(page => page + 1);
//   };

//   const handleImgClick = event => {
//     if (event.target.tagName === 'IMG') {
//       props.onClick(event.target.dataset.url, event.target.alt);
//     }
//   };

//   if (status === 'idle') {
//     return <></>;
//   }
//   if (status === 'pending' || status === 'resolved') {
//     return (
//       <div>
//         <ul className={s.ImageGallery} onClick={handleImgClick}>
//           {images.map((image, index) => (
//             <ImageGalleryItem
//               key={`${image.id}${index}`}
//               smallPicture={image.webformatURL}
//               largePicture={image.largeImageURL}
//               alt={image.tags}
//             />
//           ))}
//         </ul>
//         {status === 'resolved' && <Button onClick={changePageNumber} />}
//         {status === 'pending' && <Loader />}
//       </div>
//     );
//   }

//   if (status === 'rejected') {
//     return <h1>{error}</h1>;
//   }
// }

// ImageGallery.propTypes = {
//   searchQuery: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired,
// };
