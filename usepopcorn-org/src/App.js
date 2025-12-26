import { useEffect, useState } from "react";
import StarRating from "../src/StarRating";

const KEY = "f89fd387";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSelectedMovie(id) {
    setSelectedId(id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    console.log(movie);
    setWatched((watched) => [...watched, movie]);
    console.log(watched.length);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      if (query.length < 3) {
        setMovies([]);
        setError("");
        setIsLoading(false);
        return;
      }

      const controller = new AbortController();
      async function fetchMovies() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            console.log("nodata");
            throw new Error("Something went wrong with fetching movies");
          }

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search || []);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return (
    <div>
      <Navigation>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navigation>
      <main className="main">
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectedMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <div>
              {watched.length > 0 && <WatchedSummary watched={watched} />}
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </div>
          )}
        </Box>
      </main>
    </div>
  );
}
function Navigation({ children }) {
  return (
    <div className="nav-bar">
      <Logo />
      {children}
    </div>
  );
}

function Logo() {
  return (
    <div className="logo">
      <h1>🍿 popcorn</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      placeholder="movie name"
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    ></input>
  );
}
function NumResults({ movies }) {
  return (
    movies.length > 0 && <p className="num-results">{movies.length} results</p>
  );
}

function Box({ children }) {
  return <div className="box">{children} </div>;
}

function MoviesList({ movies, onSelectedMovie }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          onSelectedMovie={onSelectedMovie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectedMovie }) {
  return (
    <li onClick={() => onSelectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{`${movie.Title}`}</h3>
      <p>
        <span>🗓</span>
        {`${movie.Year}`}
      </p>
    </li>
  );
}

function Loader() {
  return (
    <div>
      <p>Loading.....</p>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span> {message}
    </p>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;
  console.log(title);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  useEffect(
    function () {
      if (!title) return;

      document.title = `Movie |${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  useEffect(
    function () {
      const controller = new AbortController();
      async function movieDetails() {
        try {
          setLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
            { signal: controller.signal }
          );
          const data = await res.json();
          console.log(data);
          setMovie(data);
          setLoading(false);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err);
            // (optional) surface an error UI state here
          }
        } finally {
          setLoading(false);
        }
      }
      movieDetails();

      return function () {
        controller.abort();
      };
    },
    [selectedId]
  );
  return (
    <div className="details">
      {!loading ? (
        <>
          <button className="btn-back" onClick={onCloseMovie}>
            &larr;
          </button>
          <header>
            <img src={poster} alt={`${title} poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull;{runtime}
                {genre} {year}
              </p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDbRating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={() => handleAdd()}>
                      +Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You have already rated this movie with {watchedUserRating}
                </p>
              )}
            </div>
            <p>{plot}</p>
            <p>{actors}</p>
            <p>{director}</p>
          </section>
        </>
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(2);
  const avgUserRating = average(
    watched.map((movie) => movie.userRating)
  ).toFixed(2);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(2);
  return (
    <div className="summary">
      <h2>Movies You Watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          {watched.length} movies
        </p>
        <p>
          <span>⭐</span>
          {avgImdbRating}
        </p>
        <p>
          <span>🌟</span>
          {avgUserRating}
        </p>
        <p>
          <span>⌛</span>
          {avgRuntime} min
        </p>
      </div>
    </div>
  );
}

function WatchedList({ watched, onDeleteWatched }) {
  return (
    <div>
      {
        <ul className="list list-watched">
          {watched?.map((movie) => (
            <WatchedMovie
              movie={movie}
              onDeleteWatched={onDeleteWatched}
              key={movie.imdbID}
            />
          ))}
        </ul>
      }
    </div>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title}poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐</span>
          <span> {movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⌛</span>
          <span>{movie.runtime}</span> min
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

export default App;
