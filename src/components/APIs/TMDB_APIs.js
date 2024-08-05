import {
    TMDB_GENRES_MOVIE_LIST_API,
  TMDB_MOVIE_INFO_API,
  TMDB_MOVIE_SEARCH_API,
  TMDB_OPTIONS,
  TMDB_POPULAR_MOVIES_API,
} from "../../constants";

export const getPopularMovies = async () => {
  try {
    const response = await fetch(TMDB_POPULAR_MOVIES_API, TMDB_OPTIONS);

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getMovieVideosData = async (movieId) => {
  try {
    const response = await fetch(
      `${TMDB_MOVIE_INFO_API}/${movieId}/videos`,
      TMDB_OPTIONS
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const getMovieListFromGenre = async (genreKey) => {
    try {
        const response = await fetch(`${TMDB_GENRES_MOVIE_LIST_API}${genreKey}`, TMDB_OPTIONS)
        const movieList = await response.json()
        return movieList
    }
    catch (error) {
        return error
    }
}

export const getMovieDetailsFromSearchQuery = async (movieName) => {
    try {
        const response = await fetch(`${TMDB_MOVIE_SEARCH_API}${movieName}`, TMDB_OPTIONS)
        const movieList = await response.json()
        return movieList
    }
    catch (error) {
        return error
    }
}