import React, { useEffect, useState } from "react";
import MapComponents from "../Components/MapComponents";
import PlaceCard from "../Components/PlaceCard";
import { places } from "../Services/placeServices";
import { allCategory } from "../Services/categoryServices";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const Maps_API_KEY = import.meta.env.VITE_MAPS_API_KEY;
const MAP_ID = import.meta.env.VITE_MAP_ID;

const AppPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const extractCity = (address) => {
    const parts = address.split(",");
    return parts.length >= 2 ? parts[parts.length - 2].trim() : "";
  };

  const cities = allPlaces.map((place) => extractCity(place.address));
  const uniqueCities = [...new Set(cities)];

  const fetchPlaces = async () => {
    try {
      const reponse = await places();
      setAllPlaces(reponse.data[0]);
    } catch (error) {
      console.error("Erreur récupération des lieux:", error);
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
    fetchPlaces();
    fetchCategory();
  }, []);

  useEffect(() => {
    const filtered = allPlaces.filter((place) => {
      const matchCategory = selectedCategory ? place.label === selectedCategory : true;
      const city = extractCity(place.address);
      const matchCity = selectedCity ? city.toLowerCase() === selectedCity.toLowerCase() : true;
      const matchRating = selectedRating ? Math.round(place.global_rating) === parseInt(selectedRating) : true;
      return matchCategory && matchCity && matchRating;
    });

    setFilteredPlaces(filtered);
  }, [selectedCategory, selectedCity, selectedRating, allPlaces]);

  return (
    <Container fluid className="app-page-container py-4">

      <MapComponents apiKey={Maps_API_KEY} mapId={MAP_ID} place={filteredPlaces} />

      <Row className="filter-row my-4 justify-content-center">
        <Col xs={12} md={3}>
          <Form.Select onChange={(e) => setSelectedCategory(e.target.value)} className="mb-2">
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category.label} value={category.label}>{category.label}</option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} md={3}>
          <Form.Select onChange={(e) => setSelectedCity(e.target.value)} className="mb-2">
            <option value="">Toutes les villes</option>
            {uniqueCities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} md={3}>
          <Form.Select onChange={(e) => setSelectedRating(e.target.value)} className="mb-2">
            <option value="">Toutes les notes</option>
            {[1, 2, 3, 4, 5].map((note) => (
              <option key={note} value={note}>{note} étoiles</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <PlaceCard place={filteredPlaces} />
    </Container>
  );
};

export default AppPage;

