import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import NavMenu from "../../components/NavMenu";
import { Link } from "react-router-dom";
// import moment from "moment";
// import { generoForDisplay } from "../../utils/stringUtils";

const ListaCancion = () => {
    const [ListaCancion, setListaCancion] = useState([]);
    useEffect(() => {
        getListaCancion();
        document.title = "Prueba título";
    }, [])

    const getListaCancion = () => {
        axios.get('http://localhost:3000/song')
            .then(res => {
                setListaCancion(res.data);
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
        axios.delete(`http://localhost:3000/song/${id}`)
            .then(res => {
                console.log(res.data);
                getListaCancion();
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
                                    <h2>Lista de Cancion</h2>
                                </Card.Title>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Audio</th>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListaCancion.map(cancion =>
                                            <tr key={cancion.id}>
                                                <td>
                                                    <audio controls>
                                                        <source src={`http://localhost:3000/uploads/songs/${cancion.id}.mp3`} type="audio/mpeg" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                </td>
                                                <td>{cancion.id}</td>
                                                <td>{cancion.title}</td>
                                                <td><Link className="btn btn-success" to={"/adm/cancion/" + cancion.id + "/audio"}>Audio Cancion</Link></td>
                                                <td><Link className="btn btn-primary" to={"/adm/cancion/" + cancion.id}>Editar</Link></td>
                                                <td><Button variant="danger" onClick={() => { eliminar(cancion.id) }}>Eliminar</Button></td>
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

export default ListaCancion;