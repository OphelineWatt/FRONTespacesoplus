import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let userName = "";

  if (token) {
    try {
      userName = jwtDecode(token).username;
    } catch (e) {
      console.error("Token invalide", e);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const login = () => {
    navigate("/login");
  };

    return (  <Navbar id='navbar' expand="lg">
      <Container >
                <Navbar.Brand  className="d-flex align-items-center">
          <Image
            src="logoEspaceoplus.png"
            rounded
            width="60"
            height="60"
            className="me-2"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/application">Application</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
          <Nav className="ms-auto align-items-center">
            {token ? (
              <>
                <span className="text-dark me-3">Bienvenue, <strong>{userName}</strong></span>
                <NavDropdown title="Mon Compte" id="nav-dropdown" menuVariant="dark">
                  <NavDropdown.Item href="/profile">Profil</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Déconnexion</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Button variant="primary" onClick={login}>
                Connexion
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
} 

 
export default NavBar;