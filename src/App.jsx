import { useCallback, useEffect, useState } from "react";

import { NavLink, Route, Router, Routes } from "react-router-dom";
import Game from "./components/Game/Game";
import Signup from "./pages/Signup/Signup";
import axios from "axios";
import preloaderImg from "../src/assets/img/loading.gif";
import popitImg from "../src/assets/img/popi.png";
import Preloader from "./components/Game/Preloader/Preloader";
const tg = window.Telegram.WebApp;

function App() {
  const [isAuth, setIsAuth] = useState();
  const [authId, setAuthId] = useState(tg.initDataUnsafe?.user?.id || 40432);

  const [isLoaded, setLoaded] = useState(0);
  const [currentID, setCurrentID] = useState(0);
  useEffect(() => {
    if (authId != 0) {
      axios
        .get(`${process.env.REACT_APP_API_URL}?tg_id=${authId}`)
        .then(({ data }) => {
          setIsAuth(true);
          // console.log("data.id", data[0].id);
          if (Number(data[0].clickAmount) >= 1000000) {
            document.querySelector("body").classList.add("green");
          }
          setTimeout(() => {
            setCurrentID(data[0].id);
            setTimeout(() => {
              setLoaded(1);
            }, 1200);
          }, 0);
        })
        .catch((err) => {
          setTimeout(() => {
            setLoaded(1);
          }, 1200);
        });
    }
  }, [authId]);

  useEffect(() => {
    // console.log(isAuth);
  }, [isAuth]);

  useEffect(() => {
    tg.ready();
    setTimeout(() => {
      tg.expand();
    }, 200);
  }, []);
  const softClick = () => {
    tg.HapticFeedback.impactOccurred("soft");
  };
  const rigidClick = () => {
    tg.HapticFeedback.impactOccurred("rigid");
  };
  const heavyClick = () => {
    tg.HapticFeedback.impactOccurred("heavy");
  };
  return (
    <div className="App">
      {!isLoaded ? (
        <Preloader popitImg={popitImg} preloaderImg={preloaderImg} />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              isAuth ? (
                <Game currentID={currentID} authId={authId} />
              ) : (
                <Signup isLoaded={isLoaded} />
              )
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
