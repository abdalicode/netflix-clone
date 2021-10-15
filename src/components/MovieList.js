import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import renderPathName from "../helpers/renderPathName";

const MovieImage = styled.img`
  height: 100%;
  object-fit: cover;
`;

const MovieInfo = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
`;
const MovieItem = styled(Link)`
  height: 40rem;
  position: relative;
  margin-top: 5rem;
  &:not(:last-child) {
    margin-right: 5rem;
  }

  @media (max-width: 640px) {
    height: 18rem;
    margin-top: 1rem;
    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
  &:hover {
    ${MovieInfo} {
      opacity: 1;
    }
  }
`;

const LoadMore = styled.button`
  margin: 0 auto;
  padding: 3rem 5rem;
  font-size: 2.5rem;
  color: white;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  background-color: rgba(123, 69, 89, 1);
  transition: all 0.2s ease-in-out;
  margin-bottom: 3rem;
  &:hover {
    background-color: rgba(70, 50, 80, 1);
  }
  @media (max-width: 640px) {
    padding: 1.5rem 1rem;
    font-size: 1.5rem;
  }
`;
const MoviesContainer = styled.div`
  width: 100%;
  padding: 5rem 1rem 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
const MovieTitle = styled.h4`
  font-size: 2.5rem;
  color: white;
`;
const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;
const MovieList = (props) => {
  const { setPage, movies, maxPage, page } = props;
  const renderMovies = movies.map((movie) => {
    if (!movie.poster_path) {
      return null;
    }
    return (
      <MovieItem key={movie.id} to={renderPathName(movie)}>
        <MovieImage
          src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
        ></MovieImage>
        <MovieInfo>
          <MovieTitle>{movie?.title || movie?.name}</MovieTitle>
        </MovieInfo>
      </MovieItem>
    );
  });
  return (
    <Container>
      <MoviesContainer>{renderMovies}</MoviesContainer>
      {page < maxPage
        ? movies.length && (
            <LoadMore
              onClick={() =>
                setPage((page) => {
                  return page + 1;
                })
              }
            >
              Load more...
            </LoadMore>
          )
        : null}
    </Container>
  );
};

export default MovieList;
