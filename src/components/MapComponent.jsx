import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback } from "react";
import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import { Link } from "react-router-dom";

const MAPBOX_TOKEN =
  process.env.REACT_APP_MAPBOX_TOKEN;

const MapComponent = () => {
  const [url, setUrl] = useState(
    "https://assets.babylonjs.com/environments/numbers.jpg"
  );
  const [viewport, setViewport] = useState({
    latitude: 12.971599,
    longitude: 77.594566,
    zoom: 8,
  });

  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides,
      });
    },
    [handleViewportChange]
  );

  const getImage = async () => {
    const img = await fetch(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${viewport.longitude},${viewport.latitude},${viewport.zoom},0,0/400x400?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
    );
    setUrl(img.url);
    console.log(img.url);
  };
  const buttonPress = () => {
    console.log(viewport.latitude, viewport.longitude, viewport.zoom);
    getImage();
  };
  return (
    <div style={{ height: "100vh" }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      >
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
        />
        <div
          style={{
            position: "absolute",
            left: "25%",
            bottom: "0",
            width: "46%",
            margin: "1%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button type="button" onClick={buttonPress}>
            Take Screenshot
          </button>
          <div style={{ padding: "2px" }}>
            <Link
              to={{
                pathname: "/render",
                renderProps: {
                  name: url,
                },
              }}
            >
              <button type="button">Render</button>
            </Link>
          </div>
        </div>
      </MapGL>
    </div>
  );
};

export default MapComponent;
