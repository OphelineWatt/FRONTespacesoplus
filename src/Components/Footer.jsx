import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
    return ( 
<Navbar bg="dark" variant="dark" className="p-3 mt-5">
  <Container fluid className="d-flex flex-column flex-md-row justify-content-between align-items-center">
    <Navbar.Text className="text-light mb-2 mb-md-0">
      &copy; 2025 <strong>espaces o+</strong> — Tous droits réservés
    </Navbar.Text>

    <div className="footer-links">
      <Nav className="flex-row">
        <Nav.Link href="/mentions-legales" className="text-light px-2">Mentions légales</Nav.Link>
        <Nav.Link href="/politique-confidentialite" className="text-light px-2">Confidentialité</Nav.Link>
        <Nav.Link href="/conditions-utilisation" className="text-light px-2">Conditions</Nav.Link>
        <Nav.Link href="/contact" className="text-light px-2">Contact</Nav.Link>
      </Nav>
    </div>
  </Container>
</Navbar>

     );
}
 
export default Footer;