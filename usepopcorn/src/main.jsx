import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { MoviesProvider } from "./contexts/useMovies.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MoviesProvider>
      <App />
    </MoviesProvider>
  </StrictMode>
);
