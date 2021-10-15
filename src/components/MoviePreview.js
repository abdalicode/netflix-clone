import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { BiWorld } from "react-icons/bi";
import {
  IoTime,
  IoFlameSharp,
  IoPerson,
  IoCloseCircleSharp,
  IoCaretForwardCircle,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import renderPathName from "../helpers/renderPathName";
import Trailer from "./Trailer";
import textBreaker from "../helpers/textBreaker";
const InfoContainer = styled.div`
  width: 80rem;
  padding: 4rem 4rem 2rem 2rem;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
 
  z-index: 1;
`;

const Title = styled.h2`
  color: #fcfcfc;
  font-size: 3rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;
const Desctiption = styled.p`
  font-size: 1.5rem;
  color: #fcfcfc;
`;

const MetaContainer = styled.div`
  margin-top: 2rem;
  font-size: 1.5rem;
  color: #fcfcfc;
  width: 100%;

  display: flex;
  align-items: space-evenly;
  justify-content: flex-start;
  flex-direction: column;
  flex-wrap: wrap;
  & > p {
    display: flex;
    align-items: center;
    padding: 1rem 0;
    & > svg {
      margin-right: 1rem;
      font-size: 3rem;
      color: red;
    }
  }
`;

const animate4 = keyframes`
  from {
    bottom: -100%;
  }
  to {
    bottom: 100%;
  }
`;
const animate3 = keyframes`
  from {
    right: -100%;
    height: 3px;
  }
  to {
    height: 2px;
    right: 100%;
  }
`;
const animate2 = keyframes`
  from {
    top: -100%;
  }
  to {
    top: 100%;
  }
`;
const animate1 = keyframes`
  from {
    left: -100%;
  }
  to {
    left: 100%;
  }
`;
const Btn = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 2rem 5rem;
  border-radius: 4px;
  color: red;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  margin: 0;
  filter: hue-rotate(0deg);
  border: 2px solid red;
  transition: all 0.1s linear;
  cursor: pointer;
  font-size: 2rem;
  &:hover {
    border: 2px solid transparent;
    span {
      position: absolute;
      display: block;

      &:nth-child(1) {
        filter: hue-rotate(0deg);
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, transparent, #3a86ff);
        animation: ${animate1} 1s linear infinite;
      }

      &:nth-child(2) {
        filter: hue-rotate(60deg);
        top: -100%;
        right: 0;
        width: 3px;
        height: 100%;
        background: linear-gradient(180deg, transparent, #3a86ff);
        animation: ${animate2} 1s linear infinite;
        animation-delay: 0.25s;
      }

      &:nth-child(3) {
        filter: hue-rotate(120deg);
        bottom: 0;
        right: 0;
        width: 100%;

        background: linear-gradient(270deg, transparent, #3a86ff);
        animation: ${animate3} 1s linear infinite;
        animation-delay: 0.5s;
      }

      &:nth-child(4) {
        filter: hue-rotate(300deg);
        bottom: -100%;
        left: 0;
        width: 3px;
        height: 100%;
        background: linear-gradient(360deg, transparent, #3a86ff);
        animation: ${animate4} 1s linear infinite;
        animation-delay: 0.75s;
      }
    }
  }
`;
const BtnLink = styled(Link)`
  position: relative;
  display: inline-block;
  padding: 2rem 5rem;
  border-radius: 4px;
  color: red;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  margin: 0;
  filter: hue-rotate(0deg);
  border: 2px solid red;
  transition: all 0.1s linear;
  cursor: pointer;
  font-size: 2rem;
  &:hover {
    border: 2px solid transparent;
    span {
      position: absolute;
      display: block;

      &:nth-child(1) {
        filter: hue-rotate(0deg);
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, transparent, #3a86ff);
        animation: ${animate1} 1s linear infinite;
      }

      &:nth-child(2) {
        filter: hue-rotate(60deg);
        top: -100%;
        right: 0;
        width: 3px;
        height: 100%;
        background: linear-gradient(180deg, transparent, #3a86ff);
        animation: ${animate2} 1s linear infinite;
        animation-delay: 0.25s;
      }

      &:nth-child(3) {
        filter: hue-rotate(120deg);
        bottom: 0;
        right: 0;
        width: 100%;

        background: linear-gradient(270deg, transparent, #3a86ff);
        animation: ${animate3} 1s linear infinite;
        animation-delay: 0.5s;
      }

      &:nth-child(4) {
        filter: hue-rotate(300deg);
        bottom: -100%;
        left: 0;
        width: 3px;
        height: 100%;
        background: linear-gradient(360deg, transparent, #3a86ff);
        animation: ${animate4} 1s linear infinite;
        animation-delay: 0.75s;
      }
    }
  }
`;
const CloseBtn = styled(IoCloseCircleSharp)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  height: 5rem;
  width: 5rem;
  color: rgba(255, 140, 0, 0.6);
  cursor: pointer;
  transition: all 0.3s ease-out;
  z-index: 2;
  &:hover {
    color: rgba(150, 0, 0, 0.8);
  }
`;
const Shadow = styled.div`
  height: 16vh;
  width: 100%;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.9)
  );
  position: absolute;
  bottom: 0;
  left: 0;
`;
const BtnContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-top: 2rem;
  ${Btn} {
    margin-right: 6rem;
  }
`;
const Poster = styled.img`
  margin-left: auto;
  margin-right: 5rem;
  width: 30rem;
  border-radius: 2rem;
  box-shadow: 0 0 1.5rem 0.75rem rgba(0, 0, 0, 0.3);
  transition: all 200ms linear;
  &:hover {
    box-shadow: 0 0 3rem 1.5rem rgba(0, 0, 0, 0.3);
    transform: scale(1.03);
  }
`;
const Container = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => (props.height ? props.height : "50rem")};
  min-height: 60rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: red;
  background: linear-gradient(
      to left,
      transparent,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.8)
    ),
    url(${(props) => props.backgroundSrc});
  background-size: cover;
  background-position: center;
  overflow: hidden;
  transition: height 1s ease-in-out;
  @media (max-width: 640px) {
    height: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-position: center;
    ${InfoContainer} {
      width: 100%;
      height: auto;
      align-items: center;
      justify-content: center;
      padding-top: 10rem;
    }
    ${BtnContainer} {
      /* flex-direction: column; */
      align-items: center;
      justify-content: space-between;
      width: 100%;
      ${Btn} {
        margin: 0;
        padding: 1rem;
      }
    }
    ${Poster} {
      margin: auto;
    }
  }
`;

const MoviePreview = ({ movie, closer, single }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  const renderTitle = () => {
    const movieName = movie?.name || movie?.title;
    if (movie?.original_name) {
      if (movieName !== movie?.original_name) {
        return movieName + " | " + movie?.original_name;
      } else {
        return movieName;
      }
    } else {
      return movieName;
    }
  };

  if (!movie) {
    return "";
  }
  return (
    <>
      <Container
        backgroundSrc={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        height={single && "72vh"}
      >
        {!single && <CloseBtn onClick={() => closer(false)} />}
        <InfoContainer>
          <Title>{renderTitle()}</Title>
          <Desctiption>
            {single ? movie.overview : textBreaker(movie.overview, 50, "...")}
          </Desctiption>
          <MetaContainer>
            <p>
              <IoTime />
              {movie.first_air_date
                ? `First air date: ${movie.first_air_date}`
                : `Release date: ${movie.release_date}`}
              {movie.status && `  (${movie.status})`}
            </p>
            <p>
              <IoFlameSharp />
              {movie.vote_average}
              <IoPerson style={{ marginLeft: "5rem" }} />
              {movie.vote_count}
              <BiWorld style={{ marginLeft: "5rem" }} />
              {movie.original_language}
            </p>
            {single && (
              <>
                <p>
                  Genres :{" "}
                  {movie?.genres.map(
                    (genre, index) =>
                      `${genre.name} ${
                        movie.genres.length !== index + 1 ? `|` : ""
                      }  `
                  )}
                </p>
                <p>
                  Production companies :{" "}
                  {movie?.production_companies.map(
                    (company, index) =>
                      `${company.name} ${
                        movie.production_companies.length !== index + 1
                          ? `|`
                          : ""
                      }  `
                  )}
                </p>
              </>
            )}
          </MetaContainer>
          <BtnContainer>
            {single ? (
              <>
                <Btn
                  onClick={() => {
                    setShowTrailer(true);
                  }}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <IoCaretForwardCircle
                    style={{
                      width: "2rem",
                      height: "2rem",
                      marginRight: "1rem",
                      color: "red",
                    }}
                  />
                  trailer
                </Btn>
                {movie.homepage && (
                  <Btn onClick={() => window.open(movie.homepage)}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    web page
                  </Btn>
                )}
              </>
            ) : (
              <BtnLink to={renderPathName(movie)}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                more details
              </BtnLink>
            )}
          </BtnContainer>
        </InfoContainer>
        {single && (
          <Poster
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
          ></Poster>
        )}
        {single && <Shadow></Shadow>}
      </Container>
      {showTrailer && <Trailer movie={movie} setShowTrailer={setShowTrailer} />}
    </>
  );
};

export default MoviePreview;
