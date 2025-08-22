import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import { addPlace } from "../Services/placeServices";
import { allCategory } from "../Services/categoryServices";
import { Modal, Form, Button } from "react-bootstrap";
import PlaceAutoComplete from "./PlaceAutocomplete";

const libs = ["places"];

const AddPlaceModal = ({ show, onHide }) => {
  const [place, setPlace] = useState({
    name: "",
    address: "",
    website: "",
    phone_number: "",
    description: "",
    category_id: "",
  });

  const [categories, setCategories] = useState([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    libraries: libs,
    language: "fr",
    region: "FR",
  });

  const handleCreatePlace = async (e) => {
    e.preventDefault();
    try {
      const response = await addPlace(place);
      console.log(response.data);

      onHide(); // fermer la modal
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

  return (
    <Modal show={show} onHide={onHide}>
      <Form onSubmit={handleCreatePlace}>
        <Modal.Header closeButton>
          <Modal.Title>Ajout d'un lieu</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Nom :</Form.Label>
            <Form.Control
              type="text"
              value={place.name}
              onChange={(e) => setPlace({ ...place, name: e.target.value })}
              required
            />
          </Form.Group>
          <PlaceAutoComplete
            apiKey={import.meta.env.VITE_MAPS_API_KEY}
            onPlaceSelected={(place) => console.log(place)}
          />

          <Form.Group>
            <Form.Label>Site Web :</Form.Label>
            <Form.Control
              type="text"
              value={place.website}
              onChange={(e) => setPlace({ ...place, website: e.target.value })}
              required
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
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Description :</Form.Label>
            <Form.Control
              type="text"
              value={place.description}
              onChange={(e) =>
                setDonnees({ ...place, description: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Catégorie</Form.Label>
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
