import { Button, Table } from "react-bootstrap";

import { deletePlace } from "../Services/placeServices";

const PlaceTable = ({places}) => {

      const handleDeletePlace = async (idEmploye) => {
    try {
      const confirm = window.confirm("Confirmer la suppression ?");
      if (!confirm) return;

      await deletePlace(idEmploye);
     

      location.reload();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Échec de la suppression");
    }
  };

  console.log(places);
  
  return (
    <Table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Adresse</th>
          <th>Note</th>
          <th>Statut</th>
          <th>Gestion</th>
        </tr>
      </thead>
      <tbody>
        {places.map((place, index) => (
          <tr
            key={index}
            style={{ backgroundColor: index % 2 === 0 ? "#FCEED6" : "#FFF5E8" }}
          >
            <td>{place.name}</td>
            <td>{place.address}</td>
            <td>{place.global_rating}</td>
            <td>{place.status}</td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeletePlace(place.id_place)}
                    className="btn-poubelle d-flex align-items-center gap-1"
                  >
                    <i className="bi bi-trash"></i> Supprimer
                  </Button>

                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => gestionOuvertureModal(place)}
                    className="btn-modifier d-flex align-items-center gap-1"
                  >
                    <i className="bi bi-pencil-square"></i> Modifier
                  </Button>
                </div>
              </td>
            
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default PlaceTable;
