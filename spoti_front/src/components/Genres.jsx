import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchGenres } from '../api';
import { Card, Col, Row } from 'react-bootstrap';

const Genres = ({ onSelectGenre }) => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        fetchGenres().then((response) => setGenres(response.data));
    }, []);

    return (
        <Row>
            {genres.map((genre) => (
                <Col md={4} key={genre.id}>
                    <Card onClick={() => onSelectGenre(genre.id)} className="mb-4" style={{ cursor: 'pointer' }}>
                        <Card.Img variant="top" src={`http://localhost:3000/uploads/genres/${genre.id}.jpg`} />
                        <Card.Body>
                            <Card.Title>{genre.name}</Card.Title>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};
Genres.propTypes = {
    onSelectGenre: PropTypes.func.isRequired,
};

export default Genres;
