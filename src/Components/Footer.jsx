import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "../Styles/footer.css";

const Footer = () => {
    return ( 
<Navbar bg="light" variant="light" id='footer'>
  <Container fluid className="d-flex flex-column flex-md-row justify-content-between align-items-center">
    <Navbar.Text>
      &copy; 2025 <strong>espaces o+</strong> — Tous droits réservés
    </Navbar.Text>

    <div className="footer-links">
      <Nav className="flex-row">
        <Nav.Link href="/legalNotice" >Mentions légales</Nav.Link>
        <Nav.Link href="/privacyPolicy" > Politique de confidentialité</Nav.Link>
      </Nav>
    </div>
  </Container>
</Navbar>

     );
}
 
export default Footer;