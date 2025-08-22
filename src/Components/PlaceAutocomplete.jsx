import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";

const PlaceAutoComplete = () => {
  const [placeAutocomplete, setPlaceAutocomplete] =useState(google.maps.places.Autocomplete);
  const [search, setSearch] = useState("");
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !search) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };
    console.log(new places.Autocomplete(search, options));
    
    setPlaceAutocomplete(new places.Autocomplete(search, options));
  }, [places, search]);


  
  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      console.log(placeAutocomplete.getPlace());
    });
  }, [placeAutocomplete]);
  return <input  placeholder="Search address" value={search} onChange={(e)=>{setSearch(e.currentTarget.value)}} />;
};

export default PlaceAutoComplete;