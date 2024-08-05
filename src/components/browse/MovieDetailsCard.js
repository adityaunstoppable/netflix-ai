import React, { useState } from "react";
import { ASK_AI_BG, TMDB_MOVIE_POSTER_API, YOUTUBE_URL } from "../../constants";
import { IconButton, styled, Tooltip } from "@mui/material";
import {
  PauseCircleOutlineRounded,
  PlayCircleOutlineOutlined,
} from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { getMovieVideosData } from "../APIs/TMDB_APIs";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .MuiTooltip-tooltip`]: {
    fontSize: "14px",
    padding: "10px",
    backgroundColor: "#373737",
  },
  [`& .MuiTooltip-arrow`]: {
    color: "#373737",
  },
}));

const MovieDetailsCard = ({ name, movieId, description, posterPath }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerYoutubeKey, setTrailerYoutubeKey] = useState('')

  const playTrailer = async () => {
    const movieVideosData = await getMovieVideosData(movieId);
    if (movieVideosData) {
      const youtubeTrailerKey =
        movieVideosData?.results?.filter(
          (videoData) => videoData.type === "Trailer"
        )[0]?.key ||
        movieVideosData[0]?.key ||
        "";
        setTrailerYoutubeKey(youtubeTrailerKey)
        setShowTrailer(true)
      }
  };

  return (
    <div className="z-1000 border-2 rounded-lg border-black bg-black">
      {showTrailer ? (
         <div>
         <iframe
           src={`${YOUTUBE_URL + trailerYoutubeKey}?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${trailerYoutubeKey}`}
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
           title="trailer"
           className="w-60  h-[140px] aspect-video  rounded-t-lg"
           allowFullScreen
         />
       </div>
      ) : (
        <div>
          <p className="absolute top-[20%] z-20 left-[5%]  text-white font-semibold text-xl">
            {name}
          </p>
          <div className=" opacity-70 z-10">
            <img
              alt={name}
              src={
                posterPath ? `${TMDB_MOVIE_POSTER_API}${posterPath}` : ASK_AI_BG
              }
              className=" w-96 rounded-t-lg h-[140px]"
            />
          </div>
        </div>
      )}

      <div className="flex justify-around items-center px-3 py-2">
        {!showTrailer ? (
          <IconButton aria-label="delete" onClick={playTrailer}>
            <PlayCircleOutlineOutlined
              sx={{ color: grey[300], fontSize: 35 }}
            />
          </IconButton>
        ) : (
          <IconButton aria-label="delete" onClick={() => setShowTrailer(false)}>
            <PauseCircleOutlineRounded
              sx={{ color: grey[300], fontSize: 35 }}
            />
          </IconButton>
        )}
        <div className="px-5 py-[3px] cursor-default hover:bg-slate-900 h-8 rounded-md bg-slate-800 text-white">
          <CustomTooltip title={description} arrow>
            More Info
          </CustomTooltip>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsCard;
