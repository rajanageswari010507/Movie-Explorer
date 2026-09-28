import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import MovieGrid from "../components/MovieGrid";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import { searchMovies } from "../services/movieApi";

function CategoryPage() {
  const { category } = useParams();

  const categories = {
    tamil: {
      name: "Tamil Cinema",
      popular: [
        "Jailer",
        "Leo",
        "Vikram",
        "Master",
        "Kaithi"
      ],
      upcoming: [
        "Jailer 2",
        "Sardar 2",
        "Benz"
      ]
    },

    bollywood: {
      name: "Bollywood",
      popular: [
        "Jawan",
        "Pathaan",
        "Dangal",
        "3 Idiots",
        "War"
      ],
      upcoming: [
        "King",
        "Alpha",
        "Ramayana"
      ]
    },

    hollywood: {
      name: "Hollywood",
      popular: [
        "Avatar",
        "Inception",
        "Interstellar",
        "Titanic",
        "Avengers"
      ],
      upcoming: [
        "Superman",
        "Batman",
        "Avatar"
      ]
    }
  };

  const selectedCategory = categories[category];

  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovies = async () => {
      if (!selectedCategory) {
        setError("Category not found.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        // Load popular movies
        const popularResults = await Promise.all(
          selectedCategory.popular.map(async (title) => {
            try {
              const results = await searchMovies(title);

              return results.length > 0
                ? results[0]
                : null;
            } catch {
              return null;
            }
          })
        );

        // Load upcoming movies
        const upcomingResults = await Promise.all(
          selectedCategory.upcoming.map(async (title) => {
            try {
              const results = await searchMovies(title);

              return results.length > 0
                ? results[0]
                : null;
            } catch {
              return null;
            }
          })
        );

        setPopularMovies(
          popularResults.filter(Boolean)
        );

        setUpcomingMovies(
          upcomingResults.filter(Boolean)
        );

      } catch (err) {
        console.error(err);
        setError("Unable to load movies.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [category]);

  // Loading
  if (loading) {
    return (
      <main className="category-page">
        <Loading />
      </main>
    );
  }

  // Error
  if (error) {
    return (
      <main className="category-page">

        <Link to="/" className="back-button">
          ← Back to Home
        </Link>

        <ErrorMessage message={error} />

      </main>
    );
  }

  // Invalid category
  if (!selectedCategory) {
    return (
      <main className="category-page">

        <Link to="/" className="back-button">
          ← Back to Home
        </Link>

        <ErrorMessage message="Category not found." />

      </main>
    );
  }

  return (
    <main className="category-page">

      {/* HEADER */}

      <section className="category-hero">

        <Link to="/" className="back-button">
          ← Back to Home
        </Link>

        <p className="hero-tag">
          🎬 EXPLORE CINEMA
        </p>

        <h1>
          {selectedCategory.name}
        </h1>

        <p>
          Discover popular and upcoming movies
        </p>

      </section>


      {/* POPULAR MOVIES */}

      <section className="category-movie-section">

        <div className="section-heading">

          <p>
            MOST WATCHED
          </p>

          <h2>
            🔥 Popular & Trending
          </h2>

        </div>

        {popularMovies.length > 0 ? (
          <MovieGrid movies={popularMovies} />
        ) : (
          <div className="empty-state">
            <h2>
              No popular movies found
            </h2>
          </div>
        )}

      </section>


      {/* UPCOMING MOVIES */}

      <section className="category-movie-section">

        <div className="section-heading">

          <p>
            COMING SOON
          </p>

          <h2>
            🚀 Upcoming Movies
          </h2>

        </div>

        {upcomingMovies.length > 0 ? (
          <MovieGrid movies={upcomingMovies} />
        ) : (
          <div className="empty-state">
            <h2>
              No upcoming movies found
            </h2>

            <p>
              More movies will be added soon.
            </p>
          </div>
        )}

      </section>

    </main>
  );
}

export default CategoryPage;