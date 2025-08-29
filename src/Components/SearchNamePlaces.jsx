import { Col, Form } from "react-bootstrap";

const SearchNamePlaces = ({ value, onChange}) => {


    return <>
    
        <Col xs={12} md={6}>
          <Form.Control
            type="text"
            placeholder="Filtrer par nom..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </Col>

        </>;
}
 
export default SearchNamePlaces;