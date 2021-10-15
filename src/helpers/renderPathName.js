const renderPathName = (movie) => {
  const movieName = movie.name || movie.title;
  const correctedName = movieName.split("%").join("").split(" ").join("-");
  return `/movie/${movie.id}/${correctedName}`;
};
export default renderPathName;
