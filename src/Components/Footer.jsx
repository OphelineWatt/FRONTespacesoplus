import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
    return ( 
<Navbar bg="light" variant="light" className="p-3">
  <Container fluid className="d-flex flex-column flex-md-row justify-content-between align-items-center">
    <Navbar.Text>
      &copy; 2025 <strong>espaces o+</strong> — Tous droits réservés
    </Navbar.Text>

    <div className="footer-links">
      <Nav className="flex-row">
        <Nav.Link href="/mentions-legales" >Mentions légales</Nav.Link>
        <Nav.Link href="/politique-confidentialite" >Confidentialité</Nav.Link>
        <Nav.Link href="/conditions-utilisation" >Conditions</Nav.Link>
      </Nav>
    </div>
  </Container>
</Navbar>

     );
}
 
export default Footer;