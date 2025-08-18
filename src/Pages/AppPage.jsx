import React from "react";
import MapComponents from "../Components/MapComponents";

const Maps_API_KEY = import.meta.env.VITE_MAPS_API_KEY;
const MAP_ID = import.meta.env.VITE_MAP_ID;


const AppPage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Application Espaces o+</h1>
      </header>
      <main>
        <MapComponents apiKey={Maps_API_KEY} mapId={MAP_ID} />
      </main>
    </div>
  );
};

export default AppPage;
