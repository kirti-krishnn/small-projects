import { useMovies } from "../contexts/useMovies";

function NavBar() {
  const { query, dispatch } = useMovies();
  return (
    <div className="nav-bar">
      <h1 className="logo">
        <span>🍿</span>usePopcorn
      </h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="search"
          type="text"
          placeholder="Search.."
          value={query}
          onChange={(e) =>
            dispatch({ type: "MoviesSearch", payload: e.target.value })
          }
        ></input>
      </form>
      <p className="num-results">
        Found <strong>10</strong> results
      </p>
    </div>
  );
}

export default NavBar;
