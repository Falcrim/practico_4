import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";
// import moment from "moment";
// import { generoForDisplay } from "../../utils/stringUtils";

const ListaArtista = () => {
    const [ListaArtista, setListaArtista] = useState([]);
    useEffect(() => {
        getListaArtista();
        document.title = "Prueba título";
    }, [])

    const getListaArtista = () => {
        axios.get('http://localhost:3000/artist')
            .then(res => {
                setListaArtista(res.data);
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
        axios.delete(`http://localhost:3000/artist/${id}`)
            .then(res => {
                console.log(res.data);
                getListaArtista();
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
                                    <h2>Lista de Artista</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Foto</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Albums</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaArtista.map(artist =>
                                            <tr key={artist.id}>
                                                <td>
                                                    <img src={"http://localhost:3000/uploads/artists/" + artist.id + ".jpg"} alt="Foto de perfil" width="100" />
                                                </td>
                                                <td>{artist.id}</td>
                                                <td>{artist.name}</td>
                                                <td>
                                                    <ul>
                                                        {artist.albums.map(album =>
                                                            <li key={album.id}>{album.title}</li>
                                                        )}
                                                    </ul>
                                                </td>
                                                <td><Link className="btn btn-success" to={"/adm/artista/" + artist.id + "/foto"}>Foto de Perfil</Link></td>
                                                <td><Link className="btn btn-primary" to={"/adm/artista/" + artist.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(artist.id) }}>Eliminar</Button></td>
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

export default ListaArtista;