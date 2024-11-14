import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Genres from './components/Genres';
import Artists from './components/Artists';
import Albums from './components/Albums';
import SearchBar from './components/SearchBar';
import { search } from './api';
import { Button } from 'react-bootstrap';

const App = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const navigate = useNavigate();

  const handleBackToGenres = () => {
    setSelectedGenre(null);
    setSearchResults(null);
  };

  const handleBackToArtists = () => {
    setSelectedArtist(null);
  };

  const handleSearch = async (query) => {
    console.log("Buscar:", query);
    try {
      const response = await search(query);

      // console.log("Resultados de búsqueda:", response.data.albums);
      setSearchResults(response.data);
      setSelectedGenre(null);
      setSelectedArtist(null);
    } catch (error) {
      console.error("Error al realizar la búsqueda:", error);
    }
  };

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    setSearchResults(null);
  };

  const handleArtistClick = (artistId) => {
    setSelectedArtist(artistId);
    setSearchResults(null);
  };

  const handleAlbumClick = (albumId) => {
    navigate(`/album/${albumId}`);
  };

  const handleSongClick = (songId) => {
    navigate(`/song/${songId}`);
  };

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />

      {searchResults ? (
        <div>
          <h4>Resultados de búsqueda:</h4>
          {searchResults.albums && searchResults.albums.length > 0 && (
            <div>
              <h5>Álbumes:</h5>
              {searchResults.albums.map((album) => (
                <div key={album.id} onClick={() => handleAlbumClick(album.id)} style={{ cursor: 'pointer' }}>
                  <img src={`http://localhost:3000/uploads/albums/${album.id}.jpg`} alt={album.title} style={{ width: '100px', height: '100px' }} />
                  <p>{album.title}</p>
                  <ul>
                    {Array.isArray(album.songs) && album.songs.length > 0 ? (
                      album.songs.map((song) => (
                        <li key={song.id}>
                          {song.title}
                          <audio controls>
                            <source src={`http://localhost:3000/uploads/songs/${song.id}.mp3`} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                        </li>
                      ))
                    ) : (
                      <li>No hay canciones disponibles</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}
          {searchResults.artists && searchResults.artists.length > 0 && (
            <div>
              <h5>Artistas:</h5>
              {searchResults.artists.map((artist) => (
                <div key={artist.id} onClick={() => handleArtistClick(artist.id)} style={{ cursor: 'pointer' }}>
                  <img src={`http://localhost:3000/uploads/artists/${artist.id}.jpg`} alt={artist.name} style={{ width: '100px', height: '100px' }} />
                  <p>{artist.name}</p>
                </div>
              ))}
            </div>
          )}
          {searchResults.genres && searchResults.genres.length > 0 && (
            <div>
              <h5>Géneros:</h5>
              {searchResults.genres.map((genre) => (
                <div key={genre.id} onClick={() => handleGenreClick(genre.id)} style={{ cursor: 'pointer' }}>
                  <img src={`http://localhost:3000/uploads/genres/${genre.id}.jpg`} alt={genre.name} style={{ width: '100px', height: '100px' }} />
                  <p>{genre.name}</p>
                </div>
              ))}
            </div>
          )}
          {searchResults.songs && searchResults.songs.length > 0 && (
            <div>
              <h5>Canciones:</h5>
              {searchResults.songs.map((song) => (
                <div key={song.id} onClick={() => handleSongClick(song.id)} style={{ cursor: 'pointer' }}>
                  <p>{song.title}</p>
                  <audio controls>
                    <source src={`http://localhost:3000/uploads/songs/${song.id}.mp3`} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))}
            </div>
          )}
          <Button variant="secondary" onClick={() => setSearchResults(null)}>Limpiar búsqueda</Button>
        </div>
      ) : (
        !selectedGenre ? (
          <Genres onSelectGenre={setSelectedGenre} />
        ) : !selectedArtist ? (
          <Artists genreId={selectedGenre} onSelectArtist={setSelectedArtist} onBack={handleBackToGenres} />
        ) : (
          <Albums artistId={selectedArtist} onBack={handleBackToArtists} />
        )
      )}
    </div>
  );
};

export default App;
