async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchPupularFilms() {
  return fetchWithErrorHandling(
    'https://api.themoviedb.org/3/trending/movie/day?api_key=483f016a075be90c7c51aafb3937819c',
  );
}

export function fetchFilmsByQuery(searchQuery) {
  return fetchWithErrorHandling(
    `https://api.themoviedb.org/3/search/movie/?api_key=483f016a075be90c7c51aafb3937819c&query=${searchQuery}`,
  );
}

export function fetchMovieById(movieId) {
  return fetchWithErrorHandling(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=483f016a075be90c7c51aafb3937819c`,
  );
}
export function fetchCast(movieId) {
  return fetchWithErrorHandling(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=483f016a075be90c7c51aafb3937819c`,
  );
}

export function fetchReviews(movieId) {
  return fetchWithErrorHandling(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=483f016a075be90c7c51aafb3937819c`,
  );
}
