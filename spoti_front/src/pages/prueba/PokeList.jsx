import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/pokemon')
            .then(res => {
                setPokemons(res.data);
                console.log(res.data, "Lista de Pokemones");
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar por nombre, tipo o número"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />
            <Row>
                {filteredPokemons.map(pokemon => (
                    <Col md={4} key={pokemon.id}>
                        <Card className="mb-4">
                            <Card.Img variant="top" src={`http://localhost:3000//${pokemon.id}.jpg`} />
                            <Card.Body>
                                <Card.Title>{pokemon.nombre}</Card.Title>
                                <Card.Text>Número: {pokemon.numero}</Card.Text>
                                <Link to={`/pokeprueba/${pokemon.id}`} className="btn btn-primary">
                                    Ver detalles
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default PokemonList;
