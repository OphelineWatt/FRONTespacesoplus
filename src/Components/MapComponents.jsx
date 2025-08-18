import React, { useEffect, useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import {places} from '../Services/placeServices'

// Définir les coordonnées du centre de la carte
const position = { lat: 46.232193, lng: 2.209667 };

const MapComponent = ({ apiKey,mapId }) => {
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

  useEffect(() => {
  console.log("Données récupérées :", allPlaces);
}, [allPlaces]);


  return (
    <div style={{ height: '500px', width: '100%' }}>
      <APIProvider apiKey={apiKey}>
        <Map
             mapId={mapId}

          defaultCenter={position}
          defaultZoom={6}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {/* Marqueur simple */}
{allPlaces.map((place, index) => (
<AdvancedMarker
  key={index}
  position={{
    lat: parseFloat(place.latitude),
    lng: parseFloat(place.longitude)
  }}
  title={place.name} // Affiche le nom au survol
>
  <Pin background={'#86bbe4'} glyphColor={'#507b9f'} borderColor={'#507b9f'} />
</AdvancedMarker>


))}

        </Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;