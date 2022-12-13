import React, {useContext, useEffect} from "react";
import { GoogleMap, LoadScript, MarkerF, useJsApiLoader } from '@react-google-maps/api';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { DetailContext } from "../DetailPage";
import { useState } from "react";
const containerStyle = {
  width: "100%",
  height: "400px",
};
const axios = require("axios").default;
function MapGoogle() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCTtfi6Lbe7WdnIEz82nc7MldETbQVg0og",
  });
  /* State
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  */
  const context = useContext(DetailContext);
  /*call api
  const address = encodeURIComponent(data.address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCTtfi6Lbe7WdnIEz82nc7MldETbQVg0og`;

  //Fetch API
  fetch(url)
  .then(response => response.json())
  .then(data => {
      const place = data.results[0]
      const latitude = place.geometry.location.lat
      const longitude = place.geometry.location.lng
      console.log(latitude);
      console.log(longitude);
      setLat(latitude)
      setLng(longitude)
  });
  */
  const center = {
    lat: context.data.latitude,
    lng: context.data.longitude
  };
  /* axios
  useEffect(()=> {
    axios({
      method: 'get',
      url: url,
      responseType: 'json'
    })
      .then(function (response) {
        const place = response.data.results[0]
        const latitude = place.geometry.location.lat
        const longitude = place.geometry.location.lng
        setLat(latitude)
        setLng(longitude)
      });

  },[])
  */
  return isLoaded ? (
    <GoogleMap
      mapContainerClassName="col-12 google-map"
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <MarkerF position={center}></MarkerF>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapGoogle);
