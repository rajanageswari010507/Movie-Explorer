import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/movie/:imdbId"
          element={<MovieDetails />}
        />

        <Route
          path="/category/:category"
          element={<CategoryPage />}
        />

      </Routes>

      <footer className="footer">
        <h3>🎬 Movie Explorer</h3>
        <p>Discover movies from around the world.</p>
        <p>© 2026 Movie Explorer • Built with React</p>
      </footer>

    </BrowserRouter>
  );
}

export default App;