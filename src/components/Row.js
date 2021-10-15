import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import styled from "styled-components";
import tmdb from "../api/tmdb";
import "swiper/swiper-bundle.css";
import { IoFlameSharp, IoPerson } from "react-icons/io5";
import MoviePreview from "./MoviePreview";
import { CSSTransition } from "react-transition-group";


SwiperCore.use([Navigation]);


const Container = styled.div`
  .preview-enter {
    opacity: 0;
    /* transform: scale(0.9); */
    /* height: 0; */
    transform: translateY(-25rem);
    z-index: -1;
    overflow: hidden;
  }
  .preview-enter-active {
    opacity: 1;
    /* height: 50rem;
  transform: translateX(0); */
    transform: translateY(0);
    z-index: 0;
    transition: opacity 700ms, transform 700ms, height 700ms;
  }
  .preview-exit {
    opacity: 1;
    transform: translateY(0);
    z-index: 0;
    height: 50vh;
  }
  .preview-exit-active {
    opacity: 0;
    z-index: -1;
    transform: translateY(-25rem);
    height: 0;
    transition: opacity 700ms, transform 700ms, height 700ms;
  }
`;

const SlideContainer = styled.div`
  overflow: hidden;
`;
const Slide = styled.div`
  color: white;
  font-size: 2rem;
  width: 100%;
  position: relative;
  transition: all 0.2s ease-in;
  &:hover {
    transform: scale(1.1);
  }
`;
const Title = styled.h3`
  font-size: 2.8rem;
  color: #fcfcfc;
  font-weight: 600;
  margin-left: 2rem;
  margin: 2rem 1rem 0;
  /* display: block; */
`;
const Image = styled.img`
  width: 20rem;
  display: block;
  position: relative;
`;
const Info = styled.div`
  width: 20rem;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all 0.5s linear;
  opacity: 0;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;
const MovieTitle = styled.h4`
  color: #fcfcfc;
  font-size: ${(props) => (props.smallTitle ? "1.5rem" : "1.8rem")};
  font-weight: 500;
  text-align: center;
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  align-items: center;
`;
const VoteContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  justify-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: auto;
`;
const VoteAvarage = styled.p`
  font-size: 1.9rem;
  color: #fcfcfc;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding: 0.7rem;
`;
const AverageIcon = styled(IoFlameSharp)`
  color: red;
  margin-right: 0.5rem;
`;
const CountIcon = styled(IoPerson)`
  color: rgba(255, 255, 0, 0.9);
  margin-right: 0.5rem;
`;
const VoteCount = styled(VoteAvarage)``;

// Define Styles for transition effect
const duration = 700;
// End transition effect styles

const Row = ({ title, request, posterRow, previewMode }) => {
  const [movies, setMovies] = useState([]);
  const [movieIndex, setMovieIndex] = useState(null);
  const [previewShow, setPreviewShow] = useState(false);
  const nodeRef = useRef();
  useEffect(() => {
    const fetch = async () => {
      const response = await tmdb.get(request);
      setMovies(response.data.results);
    };
    fetch();
  }, [request]);
  const handleClick = (index) => {
    if (movieIndex === index) {
      setPreviewShow(false);
    } else {
      setPreviewShow(true);
      setMovieIndex(index);
    }
  };
  const renderSlides = () => {
    return movies?.map((movie, index) => {
      return (
        <SwiperSlide key={movie.id} onClick={() => handleClick(index)}>
          <Slide>
            <Image
              src={`https://image.tmdb.org/t/p/original/${
                posterRow ? movie?.poster_path : movie?.backdrop_path
              }`}
            />
            <Info>
              <MovieTitle smallTitle={posterRow ? false : true}>
                {movie?.title || movie?.name}
              </MovieTitle>
              <VoteContainer>
                <VoteAvarage>
                  <AverageIcon />
                  {movie?.vote_average}
                </VoteAvarage>
                <VoteCount>
                  <CountIcon />
                  {movie?.vote_count}
                </VoteCount>
              </VoteContainer>
            </Info>
          </Slide>
        </SwiperSlide>
      );
    });
  };

  return (
    <Container>
      <Title>{title}</Title>
      <SlideContainer>
        <Swiper
          style={{
            padding: "2rem",
          }}
          id="row"
          slidesPerView={1}
          spaceBetween={-120}
          freeMode={false}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 150,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 100,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 100,
            },
          }}
        >
          {renderSlides()}
        </Swiper>
      </SlideContainer>
      {previewMode && (
        <CSSTransition
          nodeRef={nodeRef}
          in={previewShow}
          timeout={duration}
          classNames="preview"
          unmountOnExit
          onEnter={() => {
            setPreviewShow(true);
            nodeRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }}
          onExited={() => {
            setPreviewShow(false);
            setMovieIndex(null);
          }}
        >
          <div
            ref={nodeRef}
            style={{ overflow: "hidden", display: "block" }}
            variant="primary"
            // dismissible
          >
            <MoviePreview
              movie={movies[movieIndex]}
              closer={setPreviewShow}
              closeBtn
              buttons={[{ text: " more details", action: "getDetails" }]}
            />
          </div>
        </CSSTransition>
      )}
      )
    </Container>
  );
};
const MemoRow = React.memo(Row);
export default MemoRow;
