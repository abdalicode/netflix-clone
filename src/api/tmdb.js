import axios from "axios";

import { API_KEY } from "./apiKey";
export const requests = {
  search: `/search/movie?api_key=${API_KEY}&language=en-US&query=`,
  costum: `?api_key=${API_KEY}`,
  trending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  netflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=213`,
  popularMovies: `/movie/popular?api_key=${API_KEY}`,
  topRatedMovies: `/movie/top_rated?api_key=${API_KEY}`,
  upComingMovies: `/movie/upcoming?api_key=${API_KEY}`,
  tvPopulars: `/tv/popular?api_key=${API_KEY}`,
  actionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  comedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  romanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  horrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  documenteries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
