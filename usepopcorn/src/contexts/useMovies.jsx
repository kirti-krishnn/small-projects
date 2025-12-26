/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useEffect, useReducer } from "react";

const MoviesContext = createContext();

const initialState = {
  moviesList: [],
  watchedMovies: [],
  query: "",
  isLoading: false,
  status: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        status: "loading",
      };

    case "MoviesSearch":
      console.log(state.query);
      return {
        ...state,
        query: action.payload,
      };
    case "DataReceived":
      console.log(state.moviesList);
      return {
        ...state,
        moviesList: action.payload,
        status: "ready",
      };
    case "rejected":
      return {
        ...state,
        moviesList: [],
        query: null,
        status: "error",
      };
    default:
      return state;
  }
}

function MoviesProvider({ children }) {
  const [{ moviesList, watchedMovies, query, isLoading, status }, dispatch] =
    useReducer(reducer, initialState);

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          /* dispatch({ type: "loading" }); */

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=f89fd387&s=${query}`
          );
          const data = await res.json();
          dispatch({ type: "DataReceived", payload: data.Search || [] });
          console.log(data.Search);
        } catch (err) {
          dispatch({ type: "rejected", payload: err });
        }
      }
      fetchMovies();
    },
    [query]
  );

  async function getMovie(id) {
    try {
      dispatch({ type: "loading" });

      const res = await fetch(
        `http://www.omdbapi.com/?apikey=f89fd387&i=${id}`
      );
      const data = await res.json();
      /* dispatch({ type: "DataReceived", payload: data.Search || [] }); */
      console.log(data);
    } catch (err) {
      dispatch({ type: "rejected", payload: err });
    }
  }

  return (
    <MoviesContext.Provider
      value={{
        moviesList,
        watchedMovies,
        query,
        isLoading,
        dispatch,
        status,
        getMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

function useMovies() {
  const context = useContext(MoviesContext);
  if (context === undefined)
    throw new Error("MoviesContext was used outside of the MoviesProvider");
  return context;
}

export { MoviesProvider, useMovies };
