import { useEffect, useState } from "react";
import { addPlace } from "../Services/placeServices";
import { allCategory } from "../Services/categoryServices";
import { Modal, Form, Button } from "react-bootstrap";
import PlaceAutocomplete from "./PlaceAutocomplete";

const AddPlaceModal = ({ show, onHide }) => {
  const [place, setPlace] = useState({
    name: "",
    address: "",
    website: "",
    phone_number: "",
    description: "",
    category_id: "",
  });
  const [selectedPlace, setSelectedPlace] = useState(null);

  const [categories, setCategories] = useState([]);

  const handleCreatePlace = async (e) => {
    e.preventDefault();
    try {
      await addPlace(place);
      // fermer la modal
      onHide(); 
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const fetchCategory = async () => {
    try {
      const reponse = await allCategory();
      setCategories(reponse.data[0]);
    } catch (error) {
      console.error("Erreur récupération des catégories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (selectedPlace && selectedPlace.formatted_address) {
      setPlace((prev) => ({
        ...prev,
        address: selectedPlace.formatted_address,
      }));
    }
  }, [selectedPlace]);

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleCreatePlace}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout d'un lieu</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Nom * :</Form.Label>
            <Form.Control
              type="text"
              value={place.name}
              onChange={(e) => setPlace({ ...place, name: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Adresse * :</Form.Label>
            <PlaceAutocomplete
              value={place.name}
              onChange={(e) => setPlace({ ...place, name: e.target.value })}
              onPlaceSelect={setSelectedPlace}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Site Web :</Form.Label>
            <Form.Control
              type="text"
              value={place.website}
              onChange={(e) => setPlace({ ...place, website: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Numéro de Téléphone :</Form.Label>
            <Form.Control
              type="text"
              value={place.phone_number}
              onChange={(e) =>
                setPlace({ ...place, phone_number: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Description * :</Form.Label>
            <Form.Control
              type="text"
              value={place.description}
              onChange={(e) =>
                setPlace({ ...place, description: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Catégorie *</Form.Label>
            <Form.Select
              value={place.category_id}
              onChange={(e) =>
                setPlace({ ...place, category_id: e.target.value })
              }
              required
            >
              <option value="">Sélectionner une categorie...</option>
              {categories.map((category) => (
                <option key={category.id_category} value={category.id_category}>
                  {category.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Annuler
          </Button>
          <Button type="submit" variant="primary">
            Enregistrer
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPlaceModal;
