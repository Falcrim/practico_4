import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchArtistsByGenre } from '../api';
import { Button, Card, Col, Row } from 'react-bootstrap';

const Artists = ({ genreId, onSelectArtist, onBack }) => {
    const [artists, setArtists] = useState([]); // Inicializa como arreglo vacío

    useEffect(() => {
        if (genreId) {
            console.log("Genero seleccionado", genreId);
            fetchArtistsByGenre("" + genreId)
                .then((response) => {
                    // console.log(response.data, "Veamos que tiene");
                    if (Array.isArray(response.data)) {
                        setArtists(response.data);
                    } else {
                        setArtists([]);
                    }
                })
                .catch(() => setArtists([]));
        }
    }, [genreId]);

    return (
        <>
            <Button variant="secondary" onClick={onBack} className="mb-3">Atrás</Button>
            <Row>
                {artists.map((artist) => (
                    <Col md={4} key={artist.id}>
                        <Card onClick={() => onSelectArtist(artist.id)} className="mb-4" style={{ cursor: 'pointer' }}>
                            <Card.Img variant="top" src={`http://localhost:3000/uploads/artists/${artist.id}.jpg`} />
                            <Card.Body>
                                <Card.Title>{artist.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    );
};
Artists.propTypes = {
    genreId: PropTypes.string.isRequired,
    onSelectArtist: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};

export default Artists;

