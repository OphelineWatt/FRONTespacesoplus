import React, { useEffect, useState } from "react";
import MapComponents from "../Components/MapComponents";
import PlaceCard from "../Components/PlaceCard";
import { places } from "../Services/placeServices";
import { allCategory } from "../Services/categoryServices";

const Maps_API_KEY = import.meta.env.VITE_MAPS_API_KEY;
const MAP_ID = import.meta.env.VITE_MAP_ID;

const AppPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const [filteredPlaces, setFilteredPlaces] = useState([]);

  //récupération de mon adresse
  const extractCity = (address) => {
    const parts = address.split(",");
    return parts.length >= 2 ? parts[parts.length - 2] : "";
  };

  // récupération des villes dans les adresses
  const cities = allPlaces.map((place) => extractCity(place.address));
  const uniqueCities = [];

  cities.forEach((city) => {
    if (!uniqueCities.includes(city)) {
      uniqueCities.push(city);
    }
  });

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

  // MAJ liste des lieux filtrés
useEffect(() => {
  const filtered = allPlaces.filter((place) => {
    const matchCategory = selectedCategory
      ? place.label === selectedCategory
      : true;

    const city = extractCity(place.address);
    const matchCity = selectedCity
      ? city.toLowerCase() === selectedCity.toLowerCase()
      : true;

    const matchRating = selectedRating
      ? Math.round(place.global_rating) === parseInt(selectedRating)
      : true;

    return matchCategory && matchCity && matchRating;
  });

  setFilteredPlaces(filtered);
}, [selectedCategory, selectedCity, selectedRating, allPlaces]);


  useEffect(() => {
    fetchPlaces();
    fetchCategory();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Application Espaces o+</h1>
      </header>
      <main>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Toutes les catégories</option>
          {categories.map((category) => (
            <option value={category.label}>{category.label}</option>
          ))}
        </select>

        <select onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="">Toutes les villes</option>
          {uniqueCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>

        <select onChange={(e) => setSelectedRating(e.target.value)}>
          <option value="">Toutes les notes</option>
          {[1, 2, 3, 4, 5].map((note) => (
            <option key={note} value={note}>
              {note} étoiles
            </option>
          ))}
        </select>

        <MapComponents
          apiKey={Maps_API_KEY}
          mapId={MAP_ID}
          place={filteredPlaces}
        />
        <PlaceCard place={filteredPlaces} />
      </main>
    </div>
  );
};

export default AppPage;
