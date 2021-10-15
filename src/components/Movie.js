import React, { useState, useEffect } from "react";
import tmdb, { requests } from "../api/tmdb";
import MoviePreview from "./MoviePreview";

const Movie = (props) => {
  
  const id = props.match.params.id;
  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const fetchTv = async () => {
      await tmdb
        .get(`/tv/${id}${requests.costum}`)
        .then((resp) => {
          setMovie(resp.data);
        })
        .catch((err) => {
          console.log("error fetching 'TV'");
        });
    };
    const fetchMovie = async () => {
      await tmdb
        .get(`/movie/${id}${requests.costum}`)
        .then((resp) => {
          setMovie(resp.data);
        })
        .catch((err) => {
          fetchTv();
        });
    };
    fetchMovie();
    // window.location.hash = "top";
  }, [id]);
  return (
    <>
      <MoviePreview movie={movie} single />
    </>
  );
};

export default Movie;
