import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";
// import moment from "moment";
// import { generoForDisplay } from "../../utils/stringUtils";

const ListaGenero = () => {
    const [ListaGenero, setListaGenero] = useState([]);
    useEffect(() => {
        getListaGenero();
        document.title = "Prueba título";
    }, [])

    const getListaGenero = () => {
        axios.get('http://localhost:3000/genre')
            .then(res => {
                setListaGenero(res.data);
                console.log(res.data);
            }).catch(error => {
                console.log(error);
            });
    }
    const eliminar = (id) => {
        const confirm = window.confirm("¿Está seguro de eliminar el registro?");
        if (!confirm) {
            return;
        }
        axios.delete(`http://localhost:3000/genre/${id}`)
            .then(res => {
                console.log(res.data);
                getListaGenero();
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <>
            <NavMenu />
            <Container className="mt-3 mb-3">
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Lista de Genero</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Foto</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Artistas</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaGenero.map(genre =>
                                            <tr key={genre.id}>
                                                <td>
                                                    <img src={"http://localhost:3000/uploads/genres/" + genre.id + ".jpg"} alt="Foto de perfil" width="100" />
                                                </td>
                                                <td>{genre.id}</td>
                                                <td>{genre.name}</td>
                                                <td>
                                                    <ul>
                                                        {genre.artists.map(artist =>
                                                            <li key={artist.id}>{artist.name}</li>
                                                        )}
                                                    </ul>
                                                </td>
                                                <td><Link className="btn btn-success" to={"/adm/genero/" + genre.id + "/foto"}>Foto de Perfil</Link></td>
                                                <td><Link className="btn btn-primary" to={"/adm/genero/" + genre.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(genre.id) }}>Eliminar</Button></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >
        </>
    );
}

export default ListaGenero;