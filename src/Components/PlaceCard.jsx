import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { addFavorite } from "../Services/favoriteServices";
import { toast } from "react-toastify";
import { checkToken } from "../Services/authService";
import { useEffect, useState } from "react";

const PlaceCard = ({ place }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(checkToken());

  const handleAddFavorites = async (placeId) => {
    try {
      const favoriteData = {
        placeId: placeId,
      };
      await addFavorite(favoriteData);
      toast.success("ajouté aux favoris avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout du favori", error);
    }
  };

    useEffect(() => {
        setIsLoggedIn(checkToken());
    }, []);

  return (
    <div className="place-card-container">
      {place.map((item, index) => (
        <Card key={index} className="custom-card">
          <Card.Body>
            <div className="d-flex justify-content-between">
              <Card.Title className="card-title">{item.name}</Card.Title>
                          {(isLoggedIn) &&(
              <Button onClick={() => handleAddFavorites(item.id_place)}>
                <i class="bi bi-bookmark-heart"></i>
              </Button>
            )}
            </div>
            <Card.Subtitle className="card-subtitle mb-2 text-muted">
              {item.label}
            </Card.Subtitle>
            <Card.Text className="card-text">{item.address}</Card.Text>
            <Card.Text className="card-rating">
              Note : {item.global_rating}
            </Card.Text>
            <Card.Link href={`/review/${item.id_place}`}>
              Voir les avis
            </Card.Link>

            <div className="d-flex justify-content-end"></div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default PlaceCard;
