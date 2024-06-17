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
  const [uniqID, setUniqID] = useState(0);
  const [authId, setAuthId] = useState(tg.initDataUnsafe?.user?.id || 92929);

  const [isLoaded, setLoaded] = useState(0);
  const [currentID, setCurrentID] = useState(0);
  useEffect(() => {
    if (authId != 0) {
      axios
        .get(`http://localhost:9999/users?tg_id=${authId}`)
        .then(({ data }) => {
          // alert("data", data);
          setIsAuth(true);
          if (Number(data[0].clickAmount) >= 1000000) {
            document.querySelector("body").classList.add("green");
          }
          setTimeout(() => {
            console.log("app js", data[0]._id);
            setUniqID(data[0].uniq_id);
            setCurrentID(data[0]._id);
            setTimeout(() => {
              setLoaded(1);
            }, 1200);
          }, 0);
        })
        .catch((err) => {
          // alert("err", err);
          // alert("error");
          setTimeout(() => {
            setLoaded(1);
            // alert("isLoaded", isLoaded);
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
      setTimeout(() => {
        // alert(tg.initDataUnsafe.start_param);
      }, 700);
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
      <div style={{ color: "white" }}>{tg.initDataUnsafe.start_param}</div>
      {!isLoaded ? (
        <Preloader popitImg={popitImg} preloaderImg={preloaderImg} />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              isAuth ? (
                <Game uniqID={uniqID} currentID={currentID} authId={authId} />
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
