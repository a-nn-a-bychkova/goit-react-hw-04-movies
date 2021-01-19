// function fetchFilms() {
//   return fetch(
//     `https://api.themoviedb.org/3/movie/550?api_key=483f016a075be90c7c51aafb3937819c`,
//   ).then(response => response.json());
// }

// const api = { fetchFilms };
// export default api;

// const BASE_URL = 'http://localhost:3000/';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchPupularFilms() {
  return fetchWithErrorHandling(
    'https://api.themoviedb.org/3/trending/all/day?api_key=483f016a075be90c7c51aafb3937819c',
  );
}

export function fetchFilmsByQuery(searchQuery) {
  return fetchWithErrorHandling(
    `https://api.themoviedb.org/${searchQuery}/movie?api_key=483f016a075be90c7c51aafb3937819c`,
  );
}

// export function fetchBookById(bookId) {
//   return fetchWithErrorHandling(`${BASE_URL}/books/${bookId}?_expand=author`);
// }
