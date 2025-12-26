import styles from "./City.module.css";
import ButtonBack from "./ButtonBack";
import { useNavigate, useParams } from "react-router-dom";
import { useCities } from "../contexts/citiesContext";
import { useEffect, useRef } from "react";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();
  console.log(id);

  /* useEffect(() => {
    getCity(id);
  }, [id, getCity]); */

  const getCityRef = useRef(getCity);
  useEffect(() => {
    getCityRef.current = getCity;
  }, [getCity]);

  // now only depend on `id`
  useEffect(() => {
    if (id) getCityRef.current(id);
  }, [id]);

  const navigate = useNavigate();

  if (isLoading || !currentCity) return <Spinner />;

  /* {
    isLoading && <Spinner />;
  } */
  console.log(currentCity);

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name {id}</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}

export default City;
