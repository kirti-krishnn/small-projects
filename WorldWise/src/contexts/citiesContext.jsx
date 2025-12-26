/* eslint-disable react-refresh/only-export-components */

import { createContext, useCallback, useContext, useReducer } from "react";
import { useEffect } from "react";

const CitiesContext = createContext();
const initialState = { cities: [], currentCity: "", isLoading: false };

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id != action.payload),
        currentCity: {},
      };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  /* const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState("");
  const [isLoading, setIsLoading] = useState(false); */

  const [{ cities, currentCity, isLoading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchCities() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`http://localhost:9009/cities`);

        if (!res.ok) throw new Error("Something went wrong with fetching data");
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err });
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`http://localhost:9009/cities/${id}`);
        if (!res.ok) throw new Error("Something went wrong with fetching data");
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err });
      }
    },
    [currentCity.id]
  );

  async function createAddCity(citydata) {
    console.log(citydata);
    try {
      const res = await fetch(`http://localhost:9009/cities`, {
        method: "POST",
        body: JSON.stringify(citydata),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err });
    }
  }

  async function deleteCity(id) {
    console.log(id);
    try {
      await fetch(`http://localhost:9009/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: err });
    }

    /*   dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city...",
      }); */
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        currentCity,
        createAddCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the cities Provider");
  return context;
}

export { CitiesProvider, useCities };
