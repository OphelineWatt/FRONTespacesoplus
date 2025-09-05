import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { checkToken } from "../Services/authService";
import "../Styles/navbar.css"

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let userName = "";
  let admin = "";

  if (token) {
    try {
      checkToken()
      userName = jwtDecode(token).username;
      admin = jwtDecode(token).admin;
    } catch (e) {
      console.error("Token invalide", e);
    }
  }

  

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };


  return (
    <Navbar id="navbar" expand="lg">
      <Container>
        <Navbar.Brand className="d-flex align-items-center">
          <Image
            src="/logoEspaceoplus.png"
            rounded
            width="60"
            height="60"
            className="me-2"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Accueil</Nav.Link>
            <Nav.Link onClick={() => { navigate('/application') }}>Application</Nav.Link>
            {(admin === 1) &&(
            <Nav.Link onClick={() => { navigate('/admin') }}>Page Administrateur</Nav.Link>
            )}
          </Nav>
          <Nav className="ms-auto align-items-center">
            {token ? (
              <>
                <span className="text-dark me-3">
                  Bienvenue, <strong>{userName}</strong>
                </span>
                <NavDropdown
                  title="Mon Compte"
                  id="nav-dropdown"
                  menuVariant="dark"
                >
                  <NavDropdown.Item href="/profile">Profil</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    Déconnexion
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <div className="d-flex gap-2">
                <Button className="custom-btn" onClick={() => { navigate('/register') }}>
                  Inscription
                </Button>
                <Button className="custom-btn" onClick={() => { navigate('/login') }}>
                  Connexion
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
