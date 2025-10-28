import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const position = "Agra";

  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [city, setCity] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  useEffect(
    function () {
      async function fetchCities() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q={${position}}`
          );
          const data = await res.json();
          setCity(data[0].name);
          setLat(data[0].lat);
          setLng(data[0].lon);
          console.log(data[0]);
        } catch (err) {
          console.err(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchCities();
    },
    [count]
  );

  return (
    <div>
      <button onClick={() => setCount(() => count + 1)}>Get my Position</button>
      {isLoading && <p>...Loading Position</p>}
      <p>
        You requested position of {city} {count} times
      </p>
      {count > 0 && (
        <p>
          the lat is {lat} and lng is {lng}
        </p>
      )}
    </div>
  );
}

export default App;
