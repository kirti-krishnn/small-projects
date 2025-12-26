/* import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css"; // ✅ ensure this exists
import styles from "./Map.module.css";
import { useCities } from "../contexts/citiesContext";

import { useGeoLocation } from "../hooks/useGeoLocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useEffect, useState } from "react";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [cityName, setCityName] = useState("");

  const { position: geoLocationPosition } = useGeoLocation();

  const { mapLat, mapLng } = useUrlPosition();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng, setMapPosition]
  );

  useEffect(
    function () {
      if (geoLocationPosition)
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    },
    [geoLocationPosition, setMapPosition]
  );

  return (
    <div className={styles.mapContainer}>
      <p>cities length: {cities.length}</p>

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
        worldCopyJump={false}
        maxBounds={[
          [-85, -180],
          [85, 180],
        ]}
        maxBoundsViscosity={1.0}
        preferCanvas={true}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
          continuousWorld={false}
        />

        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>{city.cityName}</Popup>
          </Marker>
        ))}

        {mapPosition && (
          <Marker position={mapPosition}>
            <Popup>
              {cityName ? (
                <>
                  <strong>{cityName}</strong>
                  <br />
                  {mapPosition[0].toFixed(4)}, {mapPosition[1].toFixed(4)}
                </>
              ) : (
                "Fetching city name..."
              )}
            </Popup>
          </Marker>
        )}
        <ChangeCenter position={mapPosition} />
        <DetectCity setMapPosition={setMapPosition} setCityName={setCityName} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectCity({ setMapPosition, setCityName }) {
  /*   const map = useMapEvents({
    click(e) {
      setMapPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  }); */ /*

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setMapPosition([lat, lng]);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await res.json();
        const name =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          data.address.state ||
          "Unknown location";

        setCityName(name);
      } catch (err) {
        console.error("Reverse geocoding failed", err);
        setCityName("Unknown location");
      }
    },
  });

  return null;
}

export default Map;
 */

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useCities } from "../contexts/citiesContext";
import { useEffect, useState } from "react";

import { useUrlPosition } from "../hooks/useUrlPosition";
import { useGeoLocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const [mapLat, mapLng] = useUrlPosition();

  const { position: geoLocationPosition, getPosition } = useGeoLocation();

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (geoLocationPosition) {
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
      }
    },
    [geoLocationPosition]
  );
  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={() => getPosition()}>
        Get Position
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={4}
        minZoom={2}
        scrollWheelZoom={true}
        className={styles.map}
        worldCopyJump={true}
        maxBounds={[
          [-85, -180],
          [85, 180],
        ]}
        maxBoundsViscosity={1.0}
        //preferCanvas={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [map, position]);
  return null;
}

function DetectClick() {
  //const [position, setPosition] = useState(null);
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  /*  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker> 
  );*/
}

export default Map;
