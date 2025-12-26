import { useMovies } from "../contexts/useMovies";
import List from "./List";

function Box() {
  const { moviesList } = useMovies();
  return (
    <ul className="list list-movies">
      {moviesList?.map((movie) => (
        <List movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

export default Box;
