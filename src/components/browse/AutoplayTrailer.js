import React, { useEffect } from "react";
import { getMovieVideosData, getPopularMovies } from "../APIs/TMDB_APIs";
import { YOUTUBE_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { updateAutoPlaydata } from "../../redux/movieSlice";

const AutoplayTrailer = () => {

    const trailerDataFromStore = useSelector(state => state.movies?.autoPlayData)

    useEffect(() => {
            getPopularMoviesInfo();
    },[])

    const dispatch = useDispatch()

    const getPopularMoviesInfo = async () => {
        const popularMoviesFromAPI = await getPopularMovies();
        
        if (popularMoviesFromAPI?.results) {
          const randomIndex = Math.floor(Math.random() * 10);
          const randomMovie = popularMoviesFromAPI?.results[randomIndex];
          const movieId = randomMovie?.id;
          const movieDataObj = {
            movieName: randomMovie?.original_title,
            movieDescription: randomMovie?.overview
          }
          await setAutoplayData(movieId, movieDataObj);
        }
      };

      const setAutoplayData = async (movieId, movieDataObj) => {
        const movieVideosData = await getMovieVideosData(movieId);
        const videoKey =
          movieVideosData?.results?.filter((eachInfo) =>
            eachInfo.type.includes("Trailer")
          )[0]?.key || "MnHTLh6ruW0";
        const trailerUrl = YOUTUBE_URL + videoKey;

        const dispatchObj = {
            ...movieDataObj, 
            trailerUrl, 
            videoKey
        }

        dispatch(updateAutoPlaydata(dispatchObj))
      };

  return (
    <div className="autoplay-container">
    
      <div className=" text-white absolute left-28 top-[30%] w-[600px]">
        <h1 className="font-bold uppercase text-5xl">{trailerDataFromStore?.movieName}</h1>
        <p className="text-white mt-3 w-[500px]">{trailerDataFromStore?.movieDescription}</p>
      </div>
      <iframe
        src={`${trailerDataFromStore?.trailerUrl}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${trailerDataFromStore?.videoKey}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title="trailer"
        className="w-screen aspect-video -mt-32"
        allowFullScreen
    />
    </div>
  );
};

export default AutoplayTrailer;
