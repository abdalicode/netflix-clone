import React, { useState, useEffect, useCallback } from "react";
import { Formik, Field, Form } from "formik";
import styled from "styled-components";
import { IoSearchSharp } from "react-icons/io5";
import { useHistory } from "react-router-dom";
import tmdb, { requests } from "../api/tmdb";
import MovieList from "./MovieList";
import { connect } from "react-redux";

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 8rem;
  width: 15rem;
  border: none;
  background-color: grey;
  color: white;
  font-size: 3rem;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  border-radius: 0 1rem 1rem 0;
  & > svg {
    font-size: 8rem;
  }
  &:hover {
    background-color: rgba(100, 100, 100, 0.9);
  }
  @media (max-width: 640px) {
    width: 10vw;
    min-width: 8rem;
    height: 5rem;
    & > svg {
      font-size: 5rem;
    }
  }
`;
const SearchField = styled(Field)`
  width: 80rem;
  height: 8rem;
  font-size: 2.5rem;
  border: none;
  outline: none;
  padding: 1rem;
  font-weight: 500;
  color: black;
  border-radius: 1rem 0 0 1rem;
  &::placeholder {
    transition: all 200ms ease-in;
    font-size: 2.5rem;
  }
  &:focus::placeholder {
    font-size: 1.8rem;
    transform: translateY(-2rem);
  }
  @media (max-width: 640px) {
    width: 70vw;
    height: 5rem;
  }
`;
const SearchForm = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100rem;
  max-width: 90vw;
  @media (max-width: 640px) {
    width: 5rem;
  }
`;
const Container = styled.div`
  width: 100%;
  padding: 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 640px) {
    padding: 1rem 0;
  }
`;
let stateQuery = "";
let maxPage = 1;
const Search = (props) => {
  const history = useHistory();
  const useQuery = new URLSearchParams(props.location.search);
  const searchQuery = useQuery.get("search");
  const [query, setQuery] = useState(searchQuery || "");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const pusher = useCallback(
    (query) => {
      if (!query) {
        return;
      }
      history.push("/search?search=" + query);
    },
    [history]
  );
  useEffect(() => {
    if (stateQuery !== searchQuery) {
      if (page > 1) {
        setPage(1);
        return null;
      }
    }
    const fetchMovies = async () => {
      const response = await tmdb.get(
        requests.search + searchQuery + `&page=${page}`
      );
      maxPage = response.data.total_pages;
      if (stateQuery === searchQuery) {
        setMovies((oldState) => {
          return [...oldState, ...response.data.results];
        });
      } else {
        stateQuery = searchQuery;
        setMovies(response.data.results);
      }
    };
    !!searchQuery && fetchMovies();
  }, [searchQuery, page]);

  useEffect(() => {
    let timeOut;
    timeOut = setTimeout(() => {
      pusher(query);
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [query, pusher]);
  console.log(props);
  return (
    <>
      <Container>
        <Formik
          initialValues={{
            query: "",
          }}
          onSubmit={() => {
            pusher(query);
          }}
        >
          <SearchForm>
            <SearchField
              id="query"
              name="query"
              placeholder="Enter Movie name..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            ></SearchField>
            <SearchButton type="submit">
              <IoSearchSharp />
            </SearchButton>
          </SearchForm>
        </Formik>
      </Container>
      <MovieList
        movies={movies}
        setPage={setPage}
        page={page}
        maxPage={maxPage}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  return { isSignedIn: state.user.isSignedIn };
};
export default connect(mapStateToProps)(Search);
