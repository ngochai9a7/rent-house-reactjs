import React, { useContext } from "react";
import { DetailContext } from "../DetailPage";
import DateComment from "./detailcontent/DateComment";
import TitleContent from "./detailcontent/TitleContent";
import Description from "./detailcontent/Description";
import PlaceDetail from "./detailcontent/PlaceDetail";
import GoogleMap from "./detailcontent/GoogleMap";
import ImageOverview from "./detailcontent/ImageOverview";
import CustomerReviews from "./detailcontent/CustomerReviews";
import "../../assets/sass/detailpage/DetailContent.scss";
import { useState } from "react";
import ReactMapGL, {
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
  Marker,
} from "@goongmaps/goong-map-react";
import "@goongmaps/goong-js/dist/goong-js.css";

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
const SIZE = 20;
const geolocateStyle = {
  top: 0,
  left: 0,
  padding: "10px",
};

const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: "10px",
};

const navStyle = {
  top: 72,
  left: 0,
  padding: "10px",
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: "10px",
};
function DetailContent() {
  const context = useContext(DetailContext);
  //viewport
  const [viewport, setViewport] = useState({
    latitude: context.data.latitude,
    longitude: context.data.longitude,
    zoom: 16,
  });
  //popup
  
  return (
    <div className="col-8 detailcontent">
      <div className="row">
        <DateComment />
        <TitleContent />
        <Description />
        <PlaceDetail />
        
        {/* <div id="map" className="col-12 google-map">
          <ReactMapGL
            {...viewport}
            width="50vw"
            height="50vh"
            mapStyle="https://tiles.goong.io/assets/goong_light_v2.json"
            onViewportChange={(viewport) => setViewport(viewport)}
            goongApiAccessToken={process.env.REACT_APP_GOONG_MAPTILES}
          >
            <Marker
              longitude={context.data.longitude}
              latitude={context.data.latitude}
            >
              <svg
                height={SIZE}
                viewBox="0 0 24 24"
                style={{
                  cursor: "pointer",
                  fill: "#d00",
                  stroke: "none",
                  transform: `translate(${-SIZE / 2}px,${-SIZE}px)`,
                }}
              >
                <path d={ICON} />
              </svg>
            </Marker>
            <GeolocateControl style={geolocateStyle} />
            <FullscreenControl style={fullscreenControlStyle} />
            <NavigationControl style={navStyle} />
            <ScaleControl style={scaleControlStyle} />
          </ReactMapGL>
        </div> */}
        
        <CustomerReviews />
      </div>
      {/* End row*/}
    </div>
    /* End col */
  );
}

export default DetailContent;
