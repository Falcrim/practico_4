import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
// import moment from "moment";

const FormAlbum = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    // const [title, setName] = useState('');
    const [allData, setAllData] = useState({
        title: '',
        artist: 0
    });
    const [artists, setArtists] = useState([]);
    const [validated, setValidated] = useState(false);
    useEffect(() => {
        getOptions();
        if (!id) return;
        getAlbumById();
    }, [id])

    const getOptions = () => {
        axios.get('http://localhost:3000/artist')
            .then(res => {
                setArtists(res.data);
                console.log(res.data, "Veamos que tiene");
            }).catch(error => {
                console.log(error);
            });
    }

    const getAlbumById = () => {
        axios.get(`http://localhost:3000/album/${id}`)
            .then(res => {
                const artista = res.data;
                setAllData({
                    title: artista.title,
                    artist: artista.artist.id
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
        const artista = {
            title: allData.title,
            artist: parseInt(allData.artist)
        };
        // console.log(artista, "Esto mando con Id: ", id);
        if (id) {
            editAlbum(artista);
        } else {
            insertAlbum(artista);
        }

    }
    const editAlbum = (artista) => {
        console.log("LLEGO AQUI");
        axios.put(`http://localhost:3000/album/${id}`, artista)
            .then(res => {
                console.log(res.data);
                navigate('/adm/album');
            }).catch(error => {
                console.log(error);
            });
    }
    const insertAlbum = (artista) => {
        axios.post('http://localhost:3000/album', artista)
            .then(res => {
                console.log(res.data);
                navigate('/adm/album');
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
                                    <h2>Formulario Album</h2>
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
                                        <Form.Control as="select" required value={allData.artist}
                                            onChange={changeHandler} id="artist" title="artist">
                                            <option value="">Seleccione un artista</option>
                                            {artists.map(artist =>
                                                <option key={artist.id} value={artist.id}
                                                    {...allData.artist === artist.id ? 'selected' : ''}
                                                >{artist.name}</option>
                                            )}
                                        </Form.Control>
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un artista.
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

export default FormAlbum;