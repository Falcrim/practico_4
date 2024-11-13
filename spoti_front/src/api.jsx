import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
});

export const fetchGenres = () => api.get('/genre');
export const fetchArtistsByGenre = (genreId) => api.get(`/genre/${genreId}/artists`);
export const fetchAlbumsByArtist = (artistId) => api.get(`/artist/${artistId}/albums`);
export const fetchSongsByAlbum = (albumId) => api.get(`/album/${albumId}`);
export const search = (query) => api.get(`/search?query=${query}`);
