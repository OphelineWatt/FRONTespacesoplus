import { places } from "../Services/placeServices";
import { allUsers} from "../Services/userServices";

import PlaceTable from "../Components/PlaceTable";
import UserTable from "../Components/UserTable";

import { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import "../Styles/adminPage.css"

const AdminPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchPlaces = async () => {
    try {
      const reponse = await places();
      setAllPlaces(reponse.data[0]);
    } catch (error) {
      console.error("Erreur récupération des lieux:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await allUsers();
      setUsers(response.data);
      console.log(response.data);
      

    } catch (error) {
      console.error("Erreur récupération des utilisateurs:", error);
    }
  };

  useEffect(() => {
    fetchPlaces();
    fetchUsers();
  }, []);
  return (
    <>
      <Tabs defaultActiveKey="tab1" id="my-tabs" className="mb-3">
        <Tab eventKey="tab1" title="Gestion des lieux">
          <PlaceTable places={allPlaces} fetchPlaces={fetchPlaces} />
        </Tab>
        <Tab eventKey="tab2" title="Gestion des utilisateurs">
          <UserTable users={users} fetchUsers={fetchUsers} />
        </Tab>
      </Tabs>
    </>
  );
};

export default AdminPage;
