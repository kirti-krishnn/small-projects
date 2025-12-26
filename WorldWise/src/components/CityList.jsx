import { useCities } from "../contexts/citiesContext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";

function CityList() {
  /*  console.log({ isLoading });
  console.log({ cities }); */

  const { cities } = useCities();

  return cities.length === 0 ? (
    <Message message="Start your list by clicking on the map 👉" />
  ) : (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem
          name={city.cityName}
          emoji={city.emoji}
          date={city.date}
          key={city.id}
          id={city.id}
          position={city.position}
        />
      ))}
    </ul>
  );
}

export default CityList;
