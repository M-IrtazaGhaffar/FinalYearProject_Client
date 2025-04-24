'use client';
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// ✅ Your Mapbox Access Token
mapboxgl.accessToken =
  "pk.eyJ1IjoiYWR2YW5jZWRwb3MiLCJhIjoiY205ZmJpMnNrMHZsZzJrcjdsZGFtaDd4OCJ9.tgJj_Opbi4c6x7IDzRhYXA";

const AppMapBox = ({ longitude, latitude }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!longitude || !latitude) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // ✅ Your custom style
      style: "mapbox://styles/advancedpos/cm9fbx76z00j301s85ywhcpas",
      center: [longitude, latitude],
      zoom: 12,
    });

    map.addControl(new mapboxgl.NavigationControl());

    new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);

    return () => map.remove();
  }, [longitude, latitude]);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "100%", height: "400px", borderRadius: "8px" }}
    />
  );
};

export default AppMapBox;
