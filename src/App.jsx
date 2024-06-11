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
  console.log("currentID", currentID);
  useEffect(() => {
    if (authId != 0) {
      axios
        .get(
          `https://65eafaa243ce16418932f611.mockapi.io/popit/popit?tg_id=${authId}`
        )
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

            // console.log("Прелоадер скрыт");
          }, 0);
        })
        .catch((err) => {
          // console.log(err);
          // console.log(
          //   "Ваш ID не был найден в базе. Но вы можете зарегистрироваться"
          // );
          // setIsAuth(false);
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
