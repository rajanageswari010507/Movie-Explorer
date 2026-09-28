import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import { getMovieDetails } from "../services/movieApi";

function MovieDetails() {
  const { imdbId } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMovieDetails(imdbId);

        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [imdbId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!movie) {
    return null;
  }

  return (
    <main className="details-page">

      <Link to="/" className="back-button">
        ← Back to Movies
      </Link>

      <section className="details-container">

        {/* POSTER */}

        <div className="details-poster-container">

          <img
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/400x600?text=No+Poster"
            }
            alt={movie.Title}
            className="details-poster"
          />

        </div>


        {/* INFORMATION */}

        <div className="details-info">

          <p className="details-label">
            MOVIE DETAILS
          </p>

          <h1>
            {movie.Title}
          </h1>

          <div className="rating">
            ⭐ {movie.imdbRating}/10 IMDb
          </div>

          <div className="details-meta">

            <span>
              📅 {movie.Year}
            </span>

            <span>
              ⏱ {movie.Runtime}
            </span>

            <span>
              🎬 {movie.Type}
            </span>

          </div>


          <div className="detail-item">
            <strong>Genre</strong>
            <p>{movie.Genre}</p>
          </div>

          <div className="detail-item">
            <strong>Director</strong>
            <p>{movie.Director}</p>
          </div>

          <div className="detail-item">
            <strong>Actors</strong>
            <p>{movie.Actors}</p>
          </div>


          <div className="plot-box">

            <h3>
              📝 Story
            </h3>

            <p>
              {movie.Plot}
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}

export default MovieDetails;