import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavMenu = () => {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Admin</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Generos" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to={"/adm/genero"}>Lista de Generos</Link>
                            <Link className="dropdown-item" to="/adm/genero/create">
                                Crear Genero
                            </Link>
                        </NavDropdown>
                        <NavDropdown title="Artista" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to={"/adm/artista"}>Lista de Artistas</Link>
                            <Link className="dropdown-item" to="/adm/artista/create">
                                Crear Artista
                            </Link>
                        </NavDropdown>
                        <NavDropdown title="Albums" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to={"/adm/album"}>Lista de Albums</Link>
                            <Link className="dropdown-item" to="/adm/album/create">
                                Crear Album
                            </Link>
                        </NavDropdown>
                        <NavDropdown title="Canciones" id="basic-nav-dropdown">
                            <Link className="dropdown-item" to={"/adm/cancion"}>Lista de Canciones</Link>
                            <Link className="dropdown-item" to="/adm/cancion/create">
                                Crear Cancion
                            </Link>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavMenu;