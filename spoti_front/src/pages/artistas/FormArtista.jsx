import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
// import moment from "moment";

const FormArtista = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    // const [name, setName] = useState('');
    const [allData, setAllData] = useState({
        name: '',
        genre: 0
    });
    const [genres, setGenres] = useState([]);
    const [validated, setValidated] = useState(false);
    useEffect(() => {
        getOptions();
        if (!id) return;
        getArtistaById();
    }, [id])

    const getOptions = () => {
        axios.get('http://localhost:3000/genre')
            .then(res => {
                setGenres(res.data);
            }).catch(error => {
                console.log(error);
            });
    }

    const getArtistaById = () => {
        axios.get(`http://localhost:3000/artist/${id}`)
            .then(res => {
                const artista = res.data;
                setAllData({
                    name: artista.name,
                    genre: artista.genre.id
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
        setAllData({ ...allData, [e.target.name]: e.target.value })
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
            name: allData.name,
            genre: parseInt(allData.genre)
        };
        // console.log(artista, "Esto mando con Id: ", id);
        if (id) {
            editArtista(artista);
        } else {
            insertArtista(artista);
        }

    }
    const editArtista = (artista) => {
        console.log("LLEGO AQUI");
        axios.put(`http://localhost:3000/artist/${id}`, artista)
            .then(res => {
                console.log(res.data);
                navigate('/adm/artista');
            }).catch(error => {
                console.log(error);
            });
    }
    const insertArtista = (artista) => {
        axios.post('http://localhost:3000/artist', artista)
            .then(res => {
                console.log(res.data);
                navigate('/adm/artista');
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
                                    <h2>Formulario Artista</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group >
                                        <Form.Label>Name:</Form.Label>
                                        <Form.Control required value={allData.name} type="text"
                                            onChange={changeHandler} id="name" name="name" />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un name.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label>Genero:</Form.Label>
                                        <Form.Control as="select" required value={allData.genre}
                                            onChange={changeHandler} id="genre" name="genre">
                                            <option value="">Seleccione un genero</option>
                                            {genres.map(genre =>
                                                <option key={genre.id} value={genre.id}
                                                    {...allData.genre === genre.id ? 'selected' : ''}
                                                >{genre.name}</option>
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

export default FormArtista;