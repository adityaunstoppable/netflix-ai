import React, { useEffect, useState } from "react";
import {
  getMovieDetailsFromSearchQuery,
  getMovieVideosData,
} from "../APIs/TMDB_APIs";
import { useDispatch, useSelector } from "react-redux";
import {
  addAiSuggestedMovie,
  addTrailerKeyToMovie,
} from "../../redux/gptSlice";
import { ASK_AI_BG, TMDB_MOVIE_POSTER_API, YOUTUBE_URL } from "../../constants";
import { IconButton, styled, Tooltip } from "@mui/material";
import {
  PauseCircleOutlineRounded,
  PlayCircleOutlineOutlined,
} from "@mui/icons-material";
import { grey } from "@mui/material/colors";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .MuiTooltip-tooltip`]: {
    fontSize: "14px",
    padding: "10px",
    backgroundColor: "#4B0082", // Dark purple color
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#4B0082", // Dark purple color
  },
}));

const GptSuggestionMovieCard = ({ movieName, hoverState }) => {
  const movieDataFromStore = useSelector(
    (state) => state?.gpt?.aiSuggestedMovies
  );

  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    getMovieDetailsFromName();
  }, [movieName]);

  const dispatch = useDispatch();

  const getMovieDetailsFromName = async () => {
    let movieDetails = await getMovieDetailsFromSearchQuery(movieName);
    if (movieDetails?.results) {
      movieDetails =
        movieDetails?.results.filter(
          (eachResult) => eachResult.title === movieName
        )[0] || movieDetails?.results[0];

      const movieDetailsToDispatch = {
        name: movieDetails?.title,
        poster: movieDetails?.backdrop_path,
        description: movieDetails?.overview,
        id: movieDetails?.id,
      };

      dispatch(
        addAiSuggestedMovie({
          movieName: movieDetails?.title,
          movieData: movieDetailsToDispatch,
        })
      );
    }
  };

  const playTrailer = async (movieId) => {
    const movieVideosData = await getMovieVideosData(movieId);
    if (movieVideosData) {
      const youtubeTrailerKey =
        movieVideosData?.results?.filter(
          (videoData) => videoData.type === "Trailer"
        )[0]?.key ||
        movieVideosData[0]?.key ||
        "";
      if (youtubeTrailerKey) {
        dispatch(addTrailerKeyToMovie({ movieName, youtubeTrailerKey }));
        setShowTrailer(true);
      }
    }
  };

  const movieData = movieDataFromStore ? movieDataFromStore[movieName] : null;
  const moviePoster = movieData
    ? movieData.poster
      ? movieData.poster
      : ASK_AI_BG
    : null;

  return (
    <div className="p-0 w-72 mt-5 mr-4 bg-black rounded-lg text-white flex-shrink-0  suggestion-card">
      {movieDataFromStore && movieData && (
        <div>
          {hoverState && hoverState.name === movieName ? (
            // {true ? (
            <div>
              {/* render trailer or image starts */}
              {showTrailer ? (
                <div>
                  <iframe
                    src={`${
                      YOUTUBE_URL + movieData?.trailerYoutubeKey
                    }?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${
                      movieData?.trailerYoutubeKey
                    }`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    title="trailer"
                    className="w-72  h-[160px] aspect-video  rounded-t-lg"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div>
                  <p className="absolute top-[20%] z-20 left-[5%]  text-white font-semibold text-xl">
                    {movieName}
                  </p>
                  <div className="opacity-40 z-10">
                    <img
                      alt={movieName}
                      src={
                        moviePoster === ASK_AI_BG
                          ? ASK_AI_BG
                          : `${TMDB_MOVIE_POSTER_API}${moviePoster}`
                      }
                      className=" w-96 rounded-t-lg h-[140px]"
                    />
                  </div>
                </div>
              )}
              {/* render trailer or image ends */}

              {/* play and more info buttons start*/}
              <div className="flex justify-around items-center px-3 py-2">
                {!showTrailer ? (
                  <IconButton
                    aria-label="delete"
                    onClick={() => playTrailer(movieData.id)}
                  >
                    <PlayCircleOutlineOutlined
                      sx={{ color: grey[300], fontSize: 35 }}
                    />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="delete"
                    onClick={() => setShowTrailer(false)}
                  >
                    <PauseCircleOutlineRounded
                      sx={{ color: grey[300], fontSize: 35 }}
                    />
                  </IconButton>
                )}
                <CustomTooltip title={movieData.description} arrow>
                  <div className="px-5 py-[3px] cursor-default hover:bg-slate-900 h-8 rounded-md bg-slate-800 text-white">
                    More Info
                  </div>
                </CustomTooltip>
              </div>
              {/* play and more info buttons end*/}
            </div>
          ) : (
            <img
              alt={movieName}
              src={
                moviePoster === ASK_AI_BG
                  ? ASK_AI_BG
                  : `${TMDB_MOVIE_POSTER_API}${moviePoster}`
              }
              className="cursor-pointer w-72 rounded-lg h-[165px]"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default GptSuggestionMovieCard;
