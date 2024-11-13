import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';

function PokemonDetail() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState(null);
    const [evolutions, setEvolutions] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/pokemon/${id}`)
            .then(res => {
                setPokemon(res.data);
                console.log(res.data, "Detalles del Pokemon");
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`http://localhost:3000/pokemon/linea/${id}`)
            .then(res => {
                setEvolutions(res.data);
                console.log(res.data, "Línea evolutiva");
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    if (!pokemon) {
        return <p>Cargando...</p>;
    }

    const calculateStats = (baseStat, level) => {
        return {
            min: Math.floor((baseStat * 2 * level) / 100 + 5),
            max: Math.floor((baseStat * 2 * level) / 100 + 10),
        };
    };

    const { hp, ataque, defensa } = pokemon;

    return (
        <>
            <div>
                <Card>
                    <Card.Img variant="top" src={`http://localhost:3000/${pokemon.id}.jpg`} />
                    <Card.Body>
                        <Card.Title>{pokemon.nombre}</Card.Title>
                        <Card.Text>{pokemon.descripcion}</Card.Text>
                        <ListGroup>
                            <ListGroupItem>Tipo: {pokemon.tipo1.nombre} {pokemon.tipo2 ? pokemon.tipo2.nombre : "" }</ListGroupItem>
                            <ListGroupItem>Habilidades: {pokemon.habilidad1.nombre}, {pokemon.habilidad2.nombre}, {pokemon.habilidad3 ? pokemon.habilidad3.nombre : ""}</ListGroupItem>
                            <ListGroupItem>HP: {hp} ({calculateStats(hp, 50).min}-{calculateStats(hp, 50).max} al nivel 50, {calculateStats(hp, 100).min}-{calculateStats(hp, 100).max} al nivel 100)</ListGroupItem>
                            <ListGroupItem>Ataque: {ataque} ({calculateStats(ataque, 50).min}-{calculateStats(ataque, 50).max} al nivel 50, {calculateStats(ataque, 100).min}-{calculateStats(ataque, 100).max} al nivel 100)</ListGroupItem>
                            <ListGroupItem>Defensa: {defensa} ({calculateStats(defensa, 50).min}-{calculateStats(defensa, 50).max} al nivel 50, {calculateStats(defensa, 100).min}-{calculateStats(defensa, 100).max} al nivel 100)</ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>

                <h4>Linea Evolutiva</h4>
                <div>
                    {Array.isArray(evolutions) && evolutions.length > 0 ? (
                        evolutions.map(evo => (
                            <Link to={`/pokeprueba/${evo.id}`} key={evo.id}>
                                <img src={`http://localhost:3000/${evo.id}.jpg`} alt={evo.nombre} />
                                <p>{evo.nombre} (Nivel: {evo.lvlEvolucion})</p>
                            </Link>
                        ))
                    ) : (
                        <ListGroupItem>No evolutions available</ListGroupItem>
                    )}
                </div>
            </div>
        </>
    );
}

export default PokemonDetail;
