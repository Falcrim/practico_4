import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
// import moment from "moment";

const FormCancion = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    // const [title, setName] = useState('');
    const [allData, setAllData] = useState({
        title: '',
        album: 0
    });
    const [albums, setAlbums] = useState([]);
    const [validated, setValidated] = useState(false);
    useEffect(() => {
        getOptions();
        if (!id) return;
        getCancionById();
    }, [id])

    const getOptions = () => {
        axios.get('http://localhost:3000/album')
            .then(res => {
                setAlbums(res.data);
                console.log(res.data, "Veamos que tiene");
            }).catch(error => {
                console.log(error);
            });
    }

    const getCancionById = () => {
        axios.get(`http://localhost:3000/song/${id}`)
            .then(res => {
                const albuma = res.data;
                setAllData({
                    title: albuma.title,
                    album: albuma.album.id
                });
                // console.log(res.data, "Veamos que tiene");
            }).catch(error => {
                console.log(error);
            });
    }

    // const onChangeName = (e) => {
    //     setName(e.target.value);
    // }
    const changeHandler = e => {
        setAllData({ ...allData, [e.target.title]: e.target.value })
    }
    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }
        const cancion = {
            title: allData.title,
            album: parseInt(allData.album)
        };
        // console.log(albuma, "Esto mando con Id: ", id);
        if (id) {
            editCancion(cancion);
        } else {
            insertCancion(cancion);
        }

    }
    const editCancion = (cancion) => {
        console.log("LLEGO AQUI");
        axios.put(`http://localhost:3000/song/${id}`, cancion)
            .then(res => {
                console.log(res.data);
                navigate('/adm/cancion');
            }).catch(error => {
                console.log(error);
            });
    }
    const insertCancion = (cancion) => {
        axios.post('http://localhost:3000/song', cancion)
            .then(res => {
                console.log(res.data);
                navigate('/adm/cancion');
            }).catch(error => {
                console.log(error);
            });
    }
    return (
        <>
            <NavMenu />
            <Container>
                <Row className="mt-3 mb-3">
                    <Col md={6}>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <h2>Formulario Cancion</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group >
                                        <Form.Label>Name:</Form.Label>
                                        <Form.Control required value={allData.title} type="text"
                                            onChange={changeHandler} id="title" title="title" />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un title.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Genero:</Form.Label>
                                        <Form.Control as="select" required value={allData.album}
                                            onChange={changeHandler} id="album" title="album">
                                            <option value="">Seleccione un albuma</option>
                                            {albums.map(album =>
                                                <option key={album.id} value={album.id}
                                                    {...allData.album === album.id ? 'selected' : ''}
                                                >{album.title}</option>
                                            )}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un album.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Button type="submit">Guardar datos</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>);
}

export default FormCancion;