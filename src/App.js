import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Switch, useLocation } from "react-router-dom";
import Movie from "./components/Movie";
import Footer from "./components/Footer";
import Search from "./components/Search";

function App() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);
  return (
    <>
      <Navbar
        soft={
          (location.pathname === "/") | location.pathname.startsWith("/movie/")
        }
      />
      <div
        className={`${transitionStage}`}
        onAnimationEnd={() => {
          if (transitionStage === "fadeOut") {
            setTransitionStage("fadeIn");
            setDisplayLocation(location);
          }
        }}
      >
        <Switch location={displayLocation}>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/movie/:id/:movieName?" component={Movie} />
        </Switch>
      </div>
      <Switch>
        <Route path="/search" component={Search} />
        <Route path="/" exact>
          <Footer />
        </Route>
      </Switch>
    </>
  );
}
export default App;
