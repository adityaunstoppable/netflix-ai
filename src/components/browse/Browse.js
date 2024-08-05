import React, { useEffect, useState } from "react";
import "./Browse.css";
import AutoplayTrailer from "./AutoplayTrailer";
import { getMovieVideosData, getPopularMovies } from "../APIs/TMDB_APIs";
import { MOVIE_GENRES, YOUTUBE_URL } from "../../constants";
import ScrollableCards from "./ScrollableCards";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Browse = () => {
  const [popularMovies, setPopularMovies] = useState();
  const [trailerUrl, setTrailerUrl] = useState();
  const [movieName, setMovieName] = useState();
  const [movieDescription, setMovieDescription] = useState();

  const navigateTo = useNavigate();
  const userEmailFromRedux = useSelector((state) => state?.user?.email);
  useEffect(() => {
    getPopularMoviesInfo();
  }, []);

  useEffect(() => {
    if (!userEmailFromRedux) {
      navigateTo('/')
    }
  }, [userEmailFromRedux]);

  const getPopularMoviesInfo = async () => {
    const popularMoviesFromAPI = await getPopularMovies();

    if (popularMoviesFromAPI?.results) {
      setPopularMovies(popularMoviesFromAPI?.results);
      const randomIndex = Math.floor(Math.random() * 10);
      const randomMovie = popularMoviesFromAPI?.results[randomIndex];
      const movieId = randomMovie?.id;
      setMovieName(randomMovie?.original_title);
      setMovieDescription(randomMovie?.overview);
      await setTrailerVideoUrl(movieId);
    }
  };

  const setTrailerVideoUrl = async (movieId) => {
    const movieVideosData = await getMovieVideosData(movieId);
    const videoKey =
      movieVideosData?.results?.filter((eachInfo) =>
        eachInfo.type.includes("Trailer")
      )[0]?.key || "MnHTLh6ruW0";
    const trailerUrl = YOUTUBE_URL + videoKey;
    setTrailerUrl(trailerUrl);
  };

  return (
    <div className="browse-container">
      <AutoplayTrailer
        trailerUrl={trailerUrl}
        movieName={movieName}
        movieDescription={movieDescription}
      />

      {MOVIE_GENRES.map((eachGenre) => {
        const { genreKey, genreName } = eachGenre;
        return (
          <div className="bg-black h-96 w-[100%]">
            <ScrollableCards genreName={genreName} genreKey={genreKey} />
          </div>
        );
      })}
    </div>
  );
};

export default Browse;
