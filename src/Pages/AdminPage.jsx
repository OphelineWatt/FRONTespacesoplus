import { places } from "../Services/placeServices";
import PlaceTable from "../Components/PlaceTable";
import { useEffect, useState } from "react";


const AdminPage = () => {
const [allPlaces, setAllPlaces] = useState([]);

const fetchPlaces = async () => {
    try {
      const reponse = await places();
      setAllPlaces(reponse.data[0]);
    } catch (error) {
      console.error("Erreur récupération des lieux:", error);
    }
  };

    useEffect(() => {
      fetchPlaces();
    }, []);
    return <>
    <PlaceTable places={allPlaces}/>
    </>
}
 
export default AdminPage;