import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
    return ( 
            <Navbar bg='dark' variant='dark' className='p-3 mt-5' sticky="bottom">
      <Container fluid>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Ophéline</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
     );
}
 
export default Footer;