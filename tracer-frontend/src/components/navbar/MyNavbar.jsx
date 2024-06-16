import { Container } from 'react-bootstrap';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import authService from '../../services/authService'
import styles from './navbar.module.css'

const MyNavbar = ({currentUser}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Navbar bg="light" expand="lg" expanded={expanded}>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" className={`ms-4 ${styles.title}`}>Tracer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
                <Navbar.Collapse id="basic-navbar-nav" className="me-4 justify-content-end">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/users">Users</Nav.Link>
                        <NavDropdown
                            title={<Image src={currentUser?.profilePic} roundedCircle width="20" height="20" />}
                            id="basic-nav-dropdown"
                            className="custom-dropdown d-none d-lg-block"
                            align="end"
                        >
                            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                        <Nav className="d-lg-none">
                            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                        </Nav>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;
