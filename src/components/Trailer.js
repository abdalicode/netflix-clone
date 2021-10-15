import React, { useState, useEffect } from "react";
import movieTrailer from "movie-trailer";
import styled from "styled-components";

const TrailerContent = styled.iframe`
  @media (max-width: 640px) {
    width: 90vw;
    height: 20rem;
  }
`;
const TrailerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(0.5rem);
`;
const TrailerError = styled.p`
  font-size: 2.8rem;
  color: ${(props) => props.color};
  font-weight: 500;
`;

const Trailer = ({ movie, setShowTrailer }) => {
  const [trailerId, setTrailerId] = useState(null);
  useEffect(() => {
    const getTrailer = async () => {
      return await movieTrailer(movie.name || movie.title)
        .then((response) => {
          const searchParams = new URL(response).search;
          const videoId = new URLSearchParams(searchParams).get("v");
          setTrailerId(videoId);
        })
        .catch((err) => {
          setTrailerId(false);
        });
    };
    getTrailer();
  }, [movie]);
  const renderContent = () => {
    if (trailerId === null) {
      return <TrailerError color="white">Loading...</TrailerError>;
    } else if (trailerId === false) {
      return <TrailerError color="red">Trailer not found</TrailerError>;
    } else {
      return (
        <TrailerContent
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${trailerId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      );
    }
  };
  return (
    <TrailerContainer
      onClick={() => {
        setShowTrailer(false);
      }}
    >
      {renderContent()}
    </TrailerContainer>
  );
};
export default Trailer;
