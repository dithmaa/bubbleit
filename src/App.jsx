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
  const [userAvatar, setUserAvatar] = useState(
    tg.initDataUnsafe?.user?.photo_url ||
      "https://i0.wp.com/endoftheroll.com/wp-content/uploads/2022/12/dt_0782SQU44MT.jpg?fit=1800%2C1800&ssl=1"
  );
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
    }, 200);
  }, []);
  return (
    <div className="App">
      <div style={{ color: "#fff" }}>
        link:{" "}
        {tg.initData?.user?.photo_url == null
          ? "пусто"
          : tg.initData?.user?.photo_url}{" "}
        <br /> <hr />
        id: {tg.initDataUnsafe?.user?.id} <br /> <hr />
        firstname: {tg.initDataUnsafe?.user?.first_name} <br /> <hr />
        last_name: {tg.initDataUnsafe?.user?.last_name} <br /> <hr />
        username: {tg.initDataUnsafe?.user?.username} <br /> <hr />
      </div>
      <div style={{ display: "flex" }}>
        <img
          src={userAvatar}
          style={{ width: "40px", height: "40px", borderRadius: "100px" }}
        />
        <img
          src={tg.initData?.user?.photo_url}
          style={{ width: "40px", height: "40px", borderRadius: "100px" }}
        />
      </div>
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
