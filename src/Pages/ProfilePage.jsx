import { Button } from "react-bootstrap";
import AddPlaceModal from "../Components/AddPlaceModal";
import { useState } from "react";
import { profileUser } from "../Services/userServices";
import { useEffect } from "react";
import UserModal from "../Components/userModal";


const ProfilePage = () => {
  const [showModalAddPlace, setShowModalAddPlace] = useState(false);
  const [users, setUsers] = useState([]);
  const [showModalUser, setShowModalUser] = useState(false);

  const fetchUsers = async () => {
    try {
      const reponse = await profileUser();
      setUsers(reponse.data);
    } catch (error) {
      console.error("Erreur récupération des utilisateurs:", error);
    }
  };
  console.log(users);



  
    useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
            <Button onClick={() => setShowModalUser(true)}>
        Voir mes informations
      </Button>
      <Button onClick={() => setShowModalAddPlace(true)}>
        Demande d'ajout d'un lieux
      </Button>
      <UserModal   show={showModalUser} onHide={() => setShowModalUser(false)} initialUser={users}/>
      <AddPlaceModal
        show={showModalAddPlace}
        onHide={() => setShowModalAddPlace(false)}
      />
    </>
  );
};

export default ProfilePage;
