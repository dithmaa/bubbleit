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
  const [isAuth, setIsAuth] = useState(0);
  const [uniqID, setUniqID] = useState(0);
  const [authId, setAuthId] = useState(tg.initDataUnsafe?.user?.id || 77777);

  const [isLoaded, setLoaded] = useState(0);
  const [currentID, setCurrentID] = useState(0);
  useEffect(() => {
    if (authId != 0) {
      axios
        .get(`http://62.197.48.173:9999/users?tg_id=${authId}`)
        .then(({ data }) => {
          // alert("data", data);
          // alert("http://62.197.48.173:9999/users?tg_id=403521818");
          setIsAuth(true);
          // alert(isAuth);
          // alert(authId);
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
          // alert("http://62.197.48.173:9999/users?tg_id=403521818");
          // alert("err", err);
          // alert("error");
          // alert("not auth");
          // alert(authId);
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
