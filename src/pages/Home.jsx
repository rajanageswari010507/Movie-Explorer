import { useState } from "react";
import { Link } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";

import { searchMovies } from "../services/movieApi";

function Home() {
  // =========================
  // STATE
  // =========================

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // =========================
  // SEARCH MOVIES
  // =========================

  const fetchMovies = async (title = searchTerm) => {
    if (!title.trim()) {
      setError("Please enter a movie name.");
      setMovies([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await searchMovies(title);

      setMovies(data);
      setSelectedType("all");
    } catch (err) {
      setMovies([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FILTER MOVIES
  // =========================

  const filteredMovies =
    selectedType === "all"
      ? movies
      : movies.filter(
          (movie) => movie.Type === selectedType
        );

  // =========================
  // UI
  // =========================

  return (
    <main className="home">

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-tag">
            🎬 YOUR MOVIE DESTINATION
          </p>

          <h1>
            Discover Your
            <span> Next Movie</span>
          </h1>

          <p className="hero-description">
            Search thousands of movies and explore
            ratings, genres, actors, directors and more.
          </p>

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={fetchMovies}
          />

          <div className="hero-features">
            <span>🎥 Tamil</span>
            <span>🎬 Bollywood</span>
            <span>🍿 Hollywood</span>
            <span>⭐ IMDb Ratings</span>
          </div>

        </div>

      </section>


      {/* =========================
          FEATURED CINEMA SECTION
      ========================= */}

      {movies.length === 0 &&
        !loading &&
        !error && (

          <section className="featured-section">

            <div className="section-heading">

              <p>
                EXPLORE THE WORLD OF CINEMA
              </p>

              <h2>
                What are you watching today?
              </h2>

            </div>


            <div className="category-showcase">

              {/* TAMIL */}

              <Link
                to="/category/tamil"
                className="category-card tamil-card"
              >

                <div className="category-overlay">

                  <span>🎬</span>

                  <h3>
                    Tamil Cinema
                  </h3>

                  <p>
                    Popular & Upcoming Tamil Movies
                  </p>

                </div>

              </Link>


              {/* BOLLYWOOD */}

              <Link
                to="/category/bollywood"
                className="category-card bollywood-card"
              >

                <div className="category-overlay">

                  <span>✨</span>

                  <h3>
                    Bollywood
                  </h3>

                  <p>
                    Popular & Upcoming Hindi Movies
                  </p>

                </div>

              </Link>


              {/* HOLLYWOOD */}

              <Link
                to="/category/hollywood"
                className="category-card hollywood-card"
              >

                <div className="category-overlay">

                  <span>🍿</span>

                  <h3>
                    Hollywood
                  </h3>

                  <p>
                    Popular & Upcoming Movies
                  </p>

                </div>

              </Link>

            </div>

          </section>

        )}


      {/* =========================
          MOVIES SECTION
      ========================= */}

      <section className="movies-section">


        {/* =========================
            LOADING
        ========================= */}

        {loading && (

          <div className="loading">

            <div className="spinner"></div>

            <p>
              Searching for movies...
            </p>

          </div>

        )}


        {/* =========================
            ERROR
        ========================= */}

        {!loading && error && (

          <div className="error-message">

            <h3>
              ⚠️ Oops!
            </h3>

            <p>
              {error}
            </p>

          </div>

        )}


        {/* =========================
            EMPTY STATE
        ========================= */}

        {!loading &&
          !error &&
          movies.length === 0 &&
          !searchTerm && (

            <div className="empty-state">

              <div className="empty-icon">
                🎬
              </div>

              <h2>
                Start Exploring
              </h2>

              <p>
                Search for your favorite movie
                to discover more.
              </p>

            </div>

          )}


        {/* =========================
            MOVIE RESULTS
        ========================= */}

        {!loading &&
          !error &&
          movies.length > 0 && (

            <div>

              <h2>
                Discover {filteredMovies.length} Results
              </h2>


              {/* =========================
                  FILTER BUTTONS
              ========================= */}

              <div className="filters">

                <button
                  className={
                    selectedType === "all"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setSelectedType("all")
                  }
                >
                  All
                </button>


                <button
                  className={
                    selectedType === "movie"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setSelectedType("movie")
                  }
                >
                  🎬 Movies
                </button>


                <button
                  className={
                    selectedType === "series"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setSelectedType("series")
                  }
                >
                  📺 Series
                </button>


                <button
                  className={
                    selectedType === "episode"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setSelectedType("episode")
                  }
                >
                  🎞️ Episodes
                </button>

              </div>


              {/* =========================
                  MOVIE GRID
              ========================= */}

              <MovieGrid
                movies={filteredMovies}
              />

            </div>

          )}

      </section>

    </main>
  );
}

export default Home;