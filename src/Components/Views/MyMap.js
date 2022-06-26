import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

const firstIcon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
});

const lastIcon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
});

// use the map event to save the marker's location
const MyMarkers = ({ saveMarkers }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      saveMarkers({ lat: lat, lng: lng });
    },
  });

  return null;
};

const ChangeView = ({ bounds }) => {
  const map = useMap();
  if (bounds) {
    let myZoom = map.getBoundsZoom(bounds);
    let myCenter = bounds.getCenter();
    map.flyTo(myCenter, myZoom - 1);
  }

  return null;
};

const MyMap = ({
  childToParent,
  cleanUpMap,
  clearButtonClicked,
  loadRoute,
  removeLastPoint,
  cancelButtonClicked,
}) => {
  // map starting coordinates to Polytechnique Federale de Lausanne
  const startPosition = [46.5191, 6.5668];

  // save the marker and polyline positions
  const [markers, setMarkers] = useState([]);
  const [polylines, setPolylines] = useState([]);
  const [bounds, setBounds] = useState(null);

  // function to store markers
  const saveMarkers = (newMarkerCoords) => {
    // spreading the previous state in order to keep consistent array structure
    setMarkers((prevState) => [...prevState, newMarkerCoords]);
  };

  useEffect(() => {
    if (markers.length > 0) {
      let MyBounds = L.latLngBounds(
        markers.map((marker) => [marker.lat, marker.lng])
      );
      setBounds(MyBounds);
    } else {
      let MyBounds = L.latLngBounds([{ lat: 46.5191, lng: 6.5668 }]);
      setBounds(MyBounds);
    }
  }, [markers, setBounds]);

  useEffect(() => {
    // polyline needed if more than 2 markers
    if (markers.length > 1) {
      // desctructure markers to remove the lat lng keys for the polyline coordintes
      let arr = markers.map((marker) => {
        return [marker.lat, marker.lng];
      });
      setPolylines((prevState) => [...prevState, arr]);
    }
  }, [markers, setPolylines]);

  // pass the marker data on submit to parent
  useEffect(() => {
    childToParent(markers);
  }, [markers, childToParent]);

  useEffect(() => {
    if (loadRoute) {
      setMarkers(loadRoute.value);
      setPolylines([loadRoute.value]);
    }
  }, [setMarkers, loadRoute]);

  // check if user cancels route and reset all values
  useEffect(() => {
    if (cleanUpMap) {
      setMarkers([]);
      setPolylines([]);
      clearButtonClicked();
    }
  }, [cleanUpMap, setMarkers, setPolylines, clearButtonClicked]);

  useEffect(() => {
    if (removeLastPoint) {
      let myMarkers = markers.slice(0, -1);
      let myPolylines = polylines.slice(0, -2);
      setMarkers(myMarkers);
      setPolylines(myPolylines);
      cancelButtonClicked();
    }
  }, [
    removeLastPoint,
    markers,
    polylines,
    setMarkers,
    setPolylines,
    cancelButtonClicked,
  ]);

  return (
    <MapContainer
      center={startPosition}
      zoom={16}
      scrollWheelZoom={true}
      style={{ height: "80vh" }}
    >
      <ChangeView bounds={bounds} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyMarkers
        saveMarkers={saveMarkers}
        cleanUpMap={cleanUpMap}
        clearButtonClicked={clearButtonClicked}
      />
      {markers.length > 0 &&
        markers.map((marker, index) => (
          <Marker
            key={index}
            position={[marker.lat, marker.lng]}
            icon={
              index === 0
                ? firstIcon
                : index === markers.length - 1
                ? lastIcon
                : icon
            }
          ></Marker>
        ))}
      {polylines.length > 0 && (
        <Polyline positions={polylines} color={"red"}></Polyline>
      )}
    </MapContainer>
  );
};

export default MyMap;
