import { Col, Form } from "react-bootstrap";

import "../Styles/searchNamePlaces.css"

const SearchNamePlaces = ({ value, onChange}) => {


    return <>
    
     <div className="search-wrapper">
      <Form.Control
        type="text"
        placeholder="Filtrer par nom..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-bar"
      />
    </div>


        </>;
}
 
export default SearchNamePlaces;