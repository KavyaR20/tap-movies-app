import { Navbar, Container, Nav} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <Navbar bg="success" expand="lg" variant='dark'>
            <Container>
            <img
                    src="./logo.png"
                    width="35"
                    height="35"
                    className="align-top"
                    alt="React Bootstrap logo"
                />
                <Link to="/" className='navbar-brand p-2'><h1>Movies App</h1></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto" variant="dark">
                        <Link to="/" className="nav-link"><h5>Home</h5></Link>
                        <Link to="/add-movie" className="nav-link"><h5>Add Movie</h5></Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;