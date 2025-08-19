import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";


// Définir les coordonnées du centre de la carte
const position = { lat: 46.232193, lng: 2.209667 };

const MapComponent = ({ apiKey, mapId, place }) => {

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <APIProvider apiKey={apiKey}>
        <Map
          mapId={mapId}
          defaultCenter={position}
          defaultZoom={6}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        >
          {/* ajout des marker */}
          {place.map((place, index) => (
            <AdvancedMarker
              key={index}
              position={{
                lat: parseFloat(place.latitude),
                lng: parseFloat(place.longitude),
              }}
              title={place.name} // Affiche le nom au survol
            >
              <Pin
                background={"#86bbe4"}
                glyphColor={"#507b9f"}
                borderColor={"#507b9f"}
              />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;
