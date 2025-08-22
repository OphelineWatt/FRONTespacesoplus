import { Button } from "react-bootstrap";
import AddPlaceModal from "../Components/AddPlaceModal";
import { useState } from "react";
const ProfilePage = () => {
  const [showModalAddPlace, setShowModalAddPlace] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModalAddPlace(true)}>
        Ajout d'un lieux
      </Button>

      <AddPlaceModal
        show={showModalAddPlace}
        onHide={() => setShowModalAddPlace(false)}
      />
    </>
  );
};

export default ProfilePage;
