// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

/* eslint-disable react-refresh/only-export-components */

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useNavigate } from "react-router-dom";
import { useCities } from "../contexts/citiesContext";
import Message from "./Message";
import Spinner from "./Spinner";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isGeoLoading, setGeoLoading] = useState(false);
  const [geoLoadingError, setGeoLoadingError] = useState(null);
  const navigate = useNavigate();

  const { createAddCity, isLoading } = useCities();

  useEffect(
    function () {
      async function createCity() {
        if (!lat || !lng) return;

        setGeoLoading(true);
        try {
          setGeoLoadingError("");
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log(data);
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeoLoadingError(err.message || "Failed to fetch location");
        } finally {
          setGeoLoading(false);
        }
      }
      createCity();
    },
    [lat, lng]
  );

  async function handleAddClick(e) {
    e.preventDefault();
    if (!cityName && !date) return;

    const newCityData = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: { lat, lng },
    };

    await createAddCity(newCityData);
    navigate(-1);
  }

  if (isGeoLoading) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (geoLoadingError) return <Message message={geoLoadingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleAddClick}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton type="back">&larr; Back</BackButton>
      </div>
    </form>
  );
}

export default Form;
