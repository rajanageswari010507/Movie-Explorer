import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <article className="movie-card">

      <div className="poster-container">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Poster"
          }
          alt={movie.Title}
        />

        <div className="poster-overlay">
          <Link to={`/movie/${movie.imdbID}`}>
            View Details
          </Link>
        </div>
      </div>

      <div className="movie-info">

        <div className="movie-title-row">
          <h3>{movie.Title}</h3>
          <span>{movie.Year}</span>
        </div>

        <p className="movie-type">
          🎬 {movie.Type}
        </p>

        <Link
          to={`/movie/${movie.imdbID}`}
          className="details-link"
        >
          Explore Movie →
        </Link>

      </div>

    </article>
  );
}

export default MovieCard;