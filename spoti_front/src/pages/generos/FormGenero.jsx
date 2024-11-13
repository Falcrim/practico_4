import axios from "axios";
import { useEffect, useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
// import moment from "moment";

const FormGenero = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    // const [artists, setArtists] = useState([]);
    const [validated, setValidated] = useState(false);
    useEffect(() => {
        if (!id) return;
        getGeneroById();
    }, [id])

    const getGeneroById = () => {
        axios.get(`http://localhost:3000/genre/${id}`)
            .then(res => {
                const genero = res.data;
                setName(genero.name);
            }).catch(error => {
                console.log(error);
            });
    }

    const onChangeName = (e) => {
        setName(e.target.value);
    }
    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }
        const genero = {
            name
        };
        console.log(genero);
        if (id) {
            editGenero(genero);
        } else {
            insertGenero(genero);
        }

    }
    const editGenero = (genero) => {
        axios.put(`http://localhost:3000/genre/${id}`, genero)
            .then(res => {
                console.log(res.data);
                navigate('/adm/genero');
            }).catch(error => {
                console.log(error);
            });
    }
    const insertGenero = (genero) => {
        axios.post('http://localhost:3000/genre', genero)
            .then(res => {
                console.log(res.data);
                navigate('/adm/genero');
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
                                    <h2>Formulario Genero</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group >
                                        <Form.Label>Name:</Form.Label>
                                        <Form.Control required value={name} type="text" onChange={onChangeName} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor ingrese un name.
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

export default FormGenero;