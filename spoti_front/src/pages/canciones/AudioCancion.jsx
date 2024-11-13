import axios from "axios";
import { useState } from "react";
import NavMenu from "../../components/NavMenu";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const AudioCancion = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [audioPerfil, setAudioPerfil] = useState(null);
    const [validated, setValidated] = useState(false);

    const onChangeAudio = (e) => {
        setAudioPerfil(e.target.files[0]);
    }

    const onGuardarClick = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (form.checkValidity() === false) {
            return;
        }
        const formData = new FormData();
        formData.append('audio', audioPerfil);
        axios.post(`http://localhost:3000/song/${id}/audio`, formData)
            .then(res => {
                console.log(res.data);
                navigate(`/adm/cancion`);
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
                                    <h2>Audio de perfil</h2>
                                </Card.Title>
                                <Form noValidate validated={validated} onSubmit={onGuardarClick}>
                                    <Form.Group>
                                        <Form.Label>Seleccione un archivo de audio:</Form.Label>
                                        <Form.Control required type="file" accept=".mp3" onChange={onChangeAudio} />
                                        <Form.Control.Feedback type="invalid">
                                            Por favor seleccione un archivo.
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
        </>
    );
}

export default AudioCancion;