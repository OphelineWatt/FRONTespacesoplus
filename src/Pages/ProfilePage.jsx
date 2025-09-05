import { Button } from "react-bootstrap";
import AddPlaceModal from "../Components/AddPlaceModal";
import { useState, useEffect } from "react";
import { profileUser } from "../Services/userServices";
import UserModal from "../Components/userModal";
import { contribution } from "../Services/placeServices";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";
import { Favorites, deleteFavorite } from "../Services/favoriteServices";
import "../Styles/ProfilePage.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


const ProfilePage = () => {
  const [showModalAddPlace, setShowModalAddPlace] = useState(false);
  const [users, setUsers] = useState([]);
  const [showModalUser, setShowModalUser] = useState(false);
  const [placeByUser, setPlaceByUser] = useState([]);
  const [favorite, setFavorite] = useState([]);
  // ouverture du dropdawn
  const [isOpenContributions, setIsOpenContributions] = useState(false);
  const [isOpenFavorites, setIsOpenFavorites] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await profileUser();
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur récupération des infos utilisateur:", error);
    }
  };

  const fetchContribution = async () => {
    try {
      const response = await contribution();
      setPlaceByUser(response.data[0]);
    } catch (error) {
      console.error("Erreur récupération des lieux de l'utilisateur:", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await Favorites();
      setFavorite(response.data[0]);
    } catch (error) {
      console.error("Erreur récupération des lieux de l'utilisateur:", error);
    }
  };

  const handleDeleteFavorite = async (idPlace) => {
    try {
      await deleteFavorite(idPlace);
      fetchFavorites();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Échec de la suppression");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchContribution();
    fetchFavorites();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-container-buttons">
        <Button
          className="profile-button"
          onClick={() => setShowModalUser(true)}
        >
          Voir mes informations
        </Button>

        <Button
          className="profile-button"
          onClick={() => setShowModalAddPlace(true)}
        >
          Demande d'ajout d'un lieu
        </Button>

        {/* Bouton Contributions */}
        <div
          className="profile-dropdown"
          onClick={() => {
            setIsOpenContributions(!isOpenContributions);
            setIsOpenFavorites(false); // Ferme les favoris si ouverts
          }}
        >
          Voir mes contributions
          {isOpenContributions ? <ChevronUp /> : <ChevronDown />}
        </div>

        {/* Section Contributions */}
        {isOpenContributions && (
          <>
            {placeByUser.length > 0 ? (
              placeByUser.map((place) => (
                <Card key={place.id_place} className="profile-card">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Nom:</strong> {place.name} <br />
                      <strong>Adresse:</strong> {place.address} <br />
                      <strong>Statut:</strong> {place.status}
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              ))
            ) : (
              <p className="empty-message">
                Aucune contribution pour le moment.
              </p>
            )}
          </>
        )}

        {/* Bouton Favoris  */}
        <div
          className="profile-dropdown"
          onClick={() => {
            setIsOpenFavorites(!isOpenFavorites);
            setIsOpenContributions(false); // Ferme les contributions si ouverts
          }}
        >
          Voir mes favoris
          {isOpenFavorites ? <ChevronUp /> : <ChevronDown />}
        </div>

        {/* Section Favoris */}
        {isOpenFavorites && (
          <>
            {favorite.length > 0 ? (
              favorite.map((item) => (
<Card key={item.place_id} className="profile-card">
  <ListGroup variant="flush">
    <ListGroup.Item>
      <strong>Nom:</strong> {item.name} <br />
      <strong>Adresse:</strong> {item.address} <br />
      <strong>Catégorie:</strong> {item.label}
      <br />
      <div className="d-flex align-items-end justify-content-between gap-2 mt-2">
        {/* Bouton Itinéraire */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-itineraire">Itinéraire</Tooltip>}
        >
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() =>
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(item.address)}`,
                '_blank'
              )
            }
            id="profile-button-itineraire"
          >
            <i className="bi bi-geo-alt-fill me-1"></i> Itinéraire
          </Button>
        </OverlayTrigger>
        {/* Bouton Supprimer */}
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-delete">Supprimer</Tooltip>}
        >
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleDeleteFavorite(item.place_id)}
            id="profile-button-delete"
          >
            <i className="bi bi-trash-fill"></i>
          </Button>
        </OverlayTrigger>

      </div>
    </ListGroup.Item>
  </ListGroup>
</Card>
              ))
            ) : (
              <p className="empty-message">Aucun favoris pour le moment.</p>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      <UserModal
        show={showModalUser}
        onHide={() => setShowModalUser(false)}
        initialUser={users}
      />
      <AddPlaceModal
        show={showModalAddPlace}
        onHide={() => setShowModalAddPlace(false)}
        fetchContribution={fetchContribution}
      />
    </div>
  );
};

export default ProfilePage;
