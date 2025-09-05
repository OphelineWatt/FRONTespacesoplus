import { useState } from "react";
import { Button, Form, Table, Row, Col } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import { deletePlace, updatePlace } from "../Services/placeServices";
import SearchNamePlaces from "./SearchNamePlaces";

import "../Styles/placeTable.css"


const PlaceTable = ({ places, fetchPlaces }) => {
  const [filterText, setFilterText] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleDeletePlace = async (idPlace) => {
    try {
      const confirm = window.confirm("Confirmer la suppression ?");
      if (!confirm) return;

      await deletePlace(idPlace);
      location.reload();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Échec de la suppression");
    }
  };

  // Filtrage des noms de lieux et statuts
  const filteredPlaces = places.filter((place) => {
    const matchText = place.name
      .toLowerCase()
      .includes(filterText.toLowerCase());
    const matchStatus = filterStatus ? place.status === filterStatus : true;
    return matchText && matchStatus;
  });

  return (
    <div className="table-container">
      <div >
      <Row className="mb-3 gy-2">
        <Col xs={12} md={6}>
          <SearchNamePlaces value={filterText} onChange={setFilterText} />
        </Col>
        <Col xs={12} md={6}>
          <Form.Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Tous les statuts</option>
            <option value="En attente">En attente</option>
            <option value="Validée">Validée</option>
            <option value="Refusée">Refusée</option>
          </Form.Select>
        </Col>
      </Row>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Statut</th>
            <th>Gestion</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlaces.map((place, index) => (
            <tr key={index}>
              <td>{place.name}</td>
              <td>{place.address}</td>
              <td>
                <Form.Select
                  size="sm"
                  value={place.status}
                  onChange={async (e) => {
                    const newStatus = e.target.value;
                    try {
                      await updatePlace(place.id_place, { status: newStatus });
                      fetchPlaces();
                      setShowToast(true);
                    } catch (error) {
                      console.error("Erreur lors de la maj du statut :", error);
                      alert("Échec de la mise à jour du statut");
                    }
                  }}
                >
                  <option value="En attente">En attente</option>
                  <option value="Validée">Validée</option>
                  <option value="Refusée">Refusée</option>
                </Form.Select>
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeletePlace(place.id_place)}
                  className="d-flex align-items-center gap-1"
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        className="toast-success"
      >
        <Toast.Header>
          <strong className="me-auto">Statut</strong>
        </Toast.Header>
        <Toast.Body>Mise à jour réussie ! </Toast.Body>
      </Toast>
    </div>
  );
};

export default PlaceTable;
