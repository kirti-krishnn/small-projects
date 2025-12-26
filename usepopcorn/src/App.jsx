import Loader from "./components/Loader";
import Main from "./components/Main";
import NavBar from "./components/NavBar";
import { useMovies } from "./contexts/useMovies";

function App() {
  const { status } = useMovies();
  return (
    <div>
      <NavBar />
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <Main />}
    </div>
  );
}

export default App;
