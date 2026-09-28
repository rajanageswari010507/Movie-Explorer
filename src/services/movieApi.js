const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (searchTerm) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}`
    );

    const data = await response.json();

    console.log("OMDb Response:", data);

    if (data.Response === "False") {
  if (data.Error === "Too many results.") {
    throw new Error(
      "Too many results. Please enter a more specific movie name."
    );
  }

  throw new Error(data.Error || "Movie search failed");
}

    return data.Search || [];
  } catch (error) {
    console.error("Movie API Error:", error);

    if (error instanceof TypeError) {
      throw new Error(
        "Cannot connect to OMDb API. Check your internet connection or API key."
      );
    }

    throw error;
  }
};

export const getMovieDetails = async (imdbId) => {
  try {
    const response = await fetch(
      `${BASE_URL}?apikey=${API_KEY}&i=${imdbId}&plot=full`
    );

    const data = await response.json();

    console.log("Movie Details:", data);

    if (data.Response === "False") {
      throw new Error(data.Error || "Movie not found");
    }

    return data;
  } catch (error) {
    console.error("Movie Details Error:", error);

    if (error instanceof TypeError) {
      throw new Error(
        "Cannot connect to OMDb API. Check your internet connection or API key."
      );
    }

    throw error;
  }
};