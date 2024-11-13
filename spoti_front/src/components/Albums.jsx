import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchAlbumsByArtist, fetchSongsByAlbum } from '../api';
import { Button, Card, Col, Row } from 'react-bootstrap';

const Albums = ({ artistId, onBack }) => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        if (artistId) {
            fetchAlbumsByArtist(artistId).then(async (response) => {
                const albumsWithSongs = await Promise.all(
                    response.data.map(async (album) => {
                        const songsResponse = await fetchSongsByAlbum(album.id);
                        console.log("Veamos que tiene", songsResponse.data);
                        return { ...album, songs: Array.isArray(songsResponse.data.songs) ? songsResponse.data.songs : [] }; // Verifica que songs sea un arreglo
                    })
                );
                setAlbums(albumsWithSongs);
            });
        }
    }, [artistId]);

    return (
        <>
            <Button variant="secondary" onClick={onBack} className="mb-3">Atrás</Button>
            <Row>
                {albums.map((album) => (
                    <Col md={6} key={album.id}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={`http://localhost:3000/uploads/albums/${album.id}.jpg`} />
                            <Card.Body>
                                <Card.Title>{album.title}</Card.Title>
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
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};
Albums.propTypes = {
    artistId: PropTypes.string.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default Albums;

