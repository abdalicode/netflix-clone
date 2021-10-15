import Slider from "../components/Slider";
import { requests } from "../api/tmdb";
import Row from "../components/Row";
import Accordion from "../components/Accordion";
import Subscribe from "../components/Subscribe";
const Home = () => {
  return (
    <div>
      <Slider request={requests.trending} />
      <Row
        request={requests.upComingMovies}
        title="Up coming"
        posterRow
        previewMode
      />
      <Row request={requests.popularMovies} title="Popular" previewMode />
      <Row request={requests.trending} title="Trendings" previewMode />
      <Row
        request={requests.actionMovies}
        title="Action"
        posterRow
        previewMode
      />
      <Row request={requests.tvPopulars} title="TV populars" previewMode />
      <Row request={requests.topRatedMovies} title="Top rated " previewMode />
      <Row
        request={requests.comedyMovies}
        title="Comedy"
        posterRow
        previewMode
      />
      <Row
        request={requests.horrorMovies}
        title="Horror"
        posterRow
        previewMode
      />
      <Row
        request={requests.documenteries}
        title="Documentery"
        posterRow
        previewMode
      />
      <Row
        request={requests.romanceMovies}
        title="Romance"
        posterRow
        previewMode
      />
      <Accordion />
      <Subscribe />
    </div>
  );
};

export default Home;
