import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { addFavorite, Favorites } from "../Services/favoriteServices";
import { toast } from "react-toastify";
import { checkToken } from "../Services/authService";
import { useEffect, useState } from "react";
import "../Styles/placeCard.css";

const PlaceCard = ({ place }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkToken());
  const [favorites, setFavorites] = useState([]);

  // 🔄 Charger les favoris depuis le backend
 useEffect(() => {
  const fetchFavorites = async () => {
    try {
      const response = await Favorites();
      console.log("response.data[0] :", response.data[0]);

      if (Array.isArray(response.data[0])) {
        const favoriteIds = response.data[0].map((fav) => fav.place_id);
        console.log("Favoris extraits :", favoriteIds);
        setFavorites(favoriteIds);
      } else {
        console.warn("response.data[0] n'est pas un tableau");
      }
    } catch (error) {
      console.error("Erreur lors du chargement des favoris", error);
    }
  };

  if (isLoggedIn) {
    fetchFavorites();
  }
}, [isLoggedIn]);


  // ➕ Ajouter un lieu aux favoris
  const handleAddFavorites = async (placeId) => {
    if (favorites.includes(placeId)) return;

    try {
      await addFavorite({ placeId });
      setFavorites((prev) => [...prev, placeId]);
      toast.success("Ajouté aux favoris avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout du favori", error);
    }
  };

  return (
    <div className="place-card-container">
      {place.map((item, index) => {
        const placeId = parseInt(item.id_place, 10);
        const isFavorited = favorites.includes(placeId);
        console.log("Lieu :", item.name, "ID :", item.id_place);


        return (
          <Card key={index} className="custom-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <Card.Title className="card-title">{item.name}</Card.Title>

                {isLoggedIn && (
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-${placeId}`}>
                        {isFavorited
                          ? "Déjà ajouté aux favoris"
                          : "Ajouter aux favoris"}
                      </Tooltip>
                    }
                  >
                    <span>
                      <Button
                        id="favorite-button"
                        variant={isFavorited ? "success" : "outline-danger"}
                        onClick={() => handleAddFavorites(placeId)}
                        disabled={isFavorited}
                      >
                        <i
                          className={
                            isFavorited
                              ? "bi bi-bookmark-check-fill"
                              : "bi bi-bookmark-heart"
                          }
                        ></i>
                      </Button>
                    </span>
                  </OverlayTrigger>
                )}
              </div>

              <Card.Subtitle className="card-subtitle mb-2 text-muted">
                {item.label}
              </Card.Subtitle>

              <Card.Text className="card-text">{item.address}</Card.Text>

              <Card.Text className="card-rating">
                {item.global_rating && item.global_rating > 0
                  ? `Note : ${item.global_rating}`
                  : "Ce lieu n'a pas encore été noté"}
              </Card.Text>

              <Card.Link href={`/review/${placeId}`}>
                Voir les avis
              </Card.Link>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default PlaceCard;