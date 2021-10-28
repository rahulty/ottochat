import { h } from "preact";
import { useEffect } from "preact/hooks";

function initMap(lat, lng) {
  const myLatLng = { lat, lng };

  const map = window.google
    ? new window.google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: myLatLng,
      })
    : null;
  window.google &&
    new window.google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
}

const loadGMaps = (callback) => {
  const existingScript = document.getElementById("googleMaps");
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.G_KEY}`;
    script.id = "googleMaps";
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};

export function MapWidget({ data: commandData }) {
  const { lat, lng } = commandData;
  useEffect(() => {
    loadGMaps(() => {
      initMap(lat, lng);
    });
  });
  return <div id="map"></div>;
}
