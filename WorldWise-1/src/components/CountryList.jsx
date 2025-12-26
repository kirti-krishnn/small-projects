import { useCities } from "../contexts/citiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";

function CountryList() {
  const { cities, isLoading } = useCities();
  console.log(cities);
  if (!cities.length)
    return <Message message="Add your first city by clicking on the map" />;
  return (
    <div>
      {isLoading && <Spinner />}
      {!isLoading && (
        <ul className={styles.CountryList}>
          {cities.map((city) => (
            <CountryItem city={city} key={city.id} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default CountryList;
