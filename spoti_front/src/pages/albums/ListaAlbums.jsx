import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";
// import moment from "moment";
// import { generoForDisplay } from "../../utils/stringUtils";

const ListaAlbum = () => {
    const [ListaAlbum, setListaAlbum] = useState([]);
    useEffect(() => {
        getListaAlbum();
        document.title = "Prueba título";
    }, [])

    const getListaAlbum = () => {
        axios.get('http://localhost:3000/album')
            .then(res => {
                setListaAlbum(res.data);
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
        axios.delete(`http://localhost:3000/album/${id}`)
            .then(res => {
                console.log(res.data);
                getListaAlbum();
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
                                    <h2>Lista de Album</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Foto</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Canciones</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaAlbum.map(album =>
                                            <tr key={album.id}>
                                                <td>
                                                    <img src={"http://localhost:3000/uploads/albums/" + album.id + ".jpg"} alt="Foto de perfil" width="100" />
                                                </td>
                                                <td>{album.id}</td>
                                                <td>{album.title}</td>
                                                <td>
                                                    <ul>
                                                        {album.songs.map(song =>
                                                            <li key={song.id}>{song.title}</li>
                                                        )}
                                                    </ul>
                                                </td>
                                                <td><Link className="btn btn-success" to={"/adm/album/" + album.id + "/foto"}>Foto de Perfil</Link></td>
                                                <td><Link className="btn btn-primary" to={"/adm/album/" + album.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(album.id) }}>Eliminar</Button></td>
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

export default ListaAlbum;