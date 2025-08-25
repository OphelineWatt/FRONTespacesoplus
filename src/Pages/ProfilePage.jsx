import { Button } from "react-bootstrap";
import AddPlaceModal from "../Components/AddPlaceModal";
import { useState, useEffect } from "react";
import { profileUser } from "../Services/userServices";
import UserModal from "../Components/userModal";
import { contribution } from "../Services/placeServices";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { ChevronDown, ChevronUp } from "react-bootstrap-icons";

const ProfilePage = () => {
  const [showModalAddPlace, setShowModalAddPlace] = useState(false);
  const [users, setUsers] = useState([]);
  const [showModalUser, setShowModalUser] = useState(false);
  const [placeByUser, setPlaceByUser] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // 👈 dropdown state

  const fetchUsers = async () => {
    try {
      const reponse = await profileUser();
      setUsers(reponse.data);
    } catch (error) {
      console.error("Erreur récupération des infos utilisateur:", error);
    }
  };

  const fetchContribution = async () => {
    try {
      const reponse = await contribution();
      setPlaceByUser(reponse.data[0]);
    } catch (error) {
      console.error("Erreur récupération des lieux de l'utilisateur:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchContribution();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-buttons">
        <Button onClick={() => setShowModalUser(true)}>
          Voir mes informations
        </Button>

        <Button onClick={() => setShowModalAddPlace(true)}>
          Demande d'ajout d'un lieu
        </Button>

        <div
          className="contributions-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          Voir mes contributions
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </div>
      </div>



      {isOpen && (
        <>
          {placeByUser.length > 0 ? (
            placeByUser.map((place) => (
              <Card key={place.id_place} className="card-contribution">
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
            <p className="empty-message">Aucune contribution pour le moment.</p>
          )}
        </>
      )}

      <UserModal
        show={showModalUser}
        onHide={() => setShowModalUser(false)}
        initialUser={users}
      />
      <AddPlaceModal
        show={showModalAddPlace}
        onHide={() => setShowModalAddPlace(false)}
      />
    </div>
  );
};

export default ProfilePage;
