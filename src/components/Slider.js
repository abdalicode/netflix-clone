import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, EffectFade } from "swiper";
import "swiper/swiper-bundle.css";
import styled from "styled-components";
import tmdb from "../api/tmdb";
import { Link } from "react-router-dom";
import renderPathName from "../helpers/renderPathName";
import Trailer from "./Trailer";
SwiperCore.use([Autoplay, Navigation, EffectFade]);

const Slide = styled.div`
  height: 90vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  /* justify-content: center; */

  background: url(${(props) => props.url});
  object-fit: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 2rem;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 50rem;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 0.5rem;
  backdrop-filter: blur(0.2rem);
  @media(max-width:640px){
    margin-top: 5rem;
  }
`;

const SlideTitle = styled.h2`
  font-size: 3rem;
  color: white;
  font-weight: 600;
  align-self: flex-start;
`;
const Overview = styled.p`
  font-size: 1.8rem;
  color: white;
  font-weight: 400;
  text-align: left;
  margin-top: 2rem;
`;
const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 2rem;
  width: 100%;
`;
const Btn = styled(Link)`
  border: 1px solid white;
  color: white;
  font-size: 1.8rem;
  padding: 1rem 1.5rem;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    color: black;
    border: 1px solid transparent;
  }
  @media(max-width:640px){
    font-size: 1.7rem;
    padding: .5rem;
  }
`;

const Shadow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 15vh;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.9)
  );
  /* background-color: red; */
`;
const textBreaker = (text, maxCar, end) => {
  if (!text.length) {
    return "";
  }
  return text.split(" ", maxCar).join(" ") + end;
};

const Slider = ({ request }) => {
  const [movies, setMovies] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerMovie, setTrailerMovie] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await tmdb.get(request);
      setMovies(response.data.results);
    };
    fetchData();
  }, [request]);

  const renderSlides = () => {
    if (!movies.length) {
      return;
    }
    let count = 0;
    return movies.map((movie) => {
      if (movie.overview === "" || count > 4) {
        return "";
      }
      count++;
      return (
        <SwiperSlide key={movie.id}>
          <Slide
            url={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          >
            <InfoContainer>
              <SlideTitle>{movie?.name || movie?.title}</SlideTitle>
              <Overview>{textBreaker(movie.overview, 35, "...")}</Overview>
              <BtnContainer>
                <Btn to={renderPathName(movie)}>show more</Btn>
                <Btn
                  to=""
                  onClick={(e) => {
                    e.preventDefault();
                    setShowTrailer(true);
                    setTrailerMovie(movie);
                  }}
                >
                  watch trailer
                </Btn>
              </BtnContainer>
            </InfoContainer>
            <Shadow />
          </Slide>
        </SwiperSlide>
      );
    });
  };
  return (
    <>
      <Swiper
        id="main"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        effect={"fade"}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        speed={1000}
      >
        {renderSlides()}
      </Swiper>
      {showTrailer && (
        <Trailer movie={trailerMovie} setShowTrailer={setShowTrailer} />
      )}
    </>
  );
};

export default Slider;
