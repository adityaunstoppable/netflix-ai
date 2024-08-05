import React, { useEffect, useState } from "react";
import { TMDB_MOVIE_POSTER_API } from "../../constants";
import { getMovieListFromGenre } from "../APIs/TMDB_APIs";
import { useDispatch, useSelector } from "react-redux";
import { addMovieListWithGenre } from "../../redux/movieSlice";
import MovieDetailsCard from "./MovieDetailsCard";

const ScrollableCards = ({ genreName, genreKey }) => {
  const movieListFromStore = useSelector(
    (state) => state?.movies?.scrollableCards?.[genreName]
  );
  const dispatch = useDispatch();
  const [hoverState, setHoverState] = useState(null);

  useEffect(() => {
    getMovieListFromGenreKey(genreKey);
  }, [genreKey]);

  const getMovieListFromGenreKey = async (genreKey) => {
    const movieListFromApi = await getMovieListFromGenre(genreKey);
    if (movieListFromApi?.results) {
      dispatch(
        addMovieListWithGenre({
          genreName,
          genreMovieListArr: movieListFromApi?.results,
        })
      );
    }
  };

  return (
    <div className="text-white pl-14 -mt-40">
      <h1 className="text-2xl font-semibold">{genreName}</h1>
      {/* card */}
      <div className="scrollable-cards flex overflow-x-scroll overflow-visible">
        {movieListFromStore?.map((item) => (
          <div 
          onMouseOver={() => setHoverState(item)}
          onMouseLeave={() => setHoverState(null)}
          className="mt-3 ml-3 flex-shrink-0 movie-card-container w-60">
            {hoverState && hoverState.id === item.id ? (
              <MovieDetailsCard
                name={item?.original_title}
                description={item?.overview}
                posterPath={item?.backdrop_path}
                movieId={item?.id}
                setHoverState={setHoverState}
              />
            ) : (
              <img
                src={`${TMDB_MOVIE_POSTER_API}/${item.backdrop_path}`}
                className="rounded-sm cursor-pointer"
                alt="poster"
              />
            )} 
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollableCards;
