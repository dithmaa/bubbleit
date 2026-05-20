import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import axios from "axios";

import { Game } from "./components/Game/Game";
import Signup from "./pages/Signup/Signup";
import { Preloader } from "./widgets/Preloader/";

import {
  DEFAULT_TIMEOUT_TRESHOLD,
  DEFAULT_USER_ID,
  EMPTY_USER_ID,
  NEW_LEVEL_TRESHOLD,
  NO_TRESHOLD,
  SHORT_TIMEOUT_TRESHOLD,
  tg,
} from "./shared/constants";

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [authId, setAuthId] = useState<number>(
    tg.initDataUnsafe?.user?.id || DEFAULT_USER_ID
  );
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [currentID, setCurrentID] = useState<number>();

  // TODO: Decompose in hook
  useEffect(() => {
    if (authId !== EMPTY_USER_ID) {
      axios
        .get(`${process.env.REACT_APP_API_URL}?tg_id=${authId}`)
        .then(({ data }) => {
          setIsAuth(true);
          // TODO: decompose magic number 0
          if (
            data &&
            data[0] &&
            Number(data[0].clickAmount) >= NEW_LEVEL_TRESHOLD
          ) {
            document.querySelector("body")?.classList.add("green");
          }

          setTimeout(() => {
            setCurrentID(data[0].id);
            setTimeout(() => {
              setLoaded(true);
            }, DEFAULT_TIMEOUT_TRESHOLD);
          }, NO_TRESHOLD);
        })
        .catch((err) => {
          setTimeout(() => {
            setLoaded(true);
          }, DEFAULT_TIMEOUT_TRESHOLD);
        });
    }
  }, [authId]);

  useEffect(() => {
    tg.ready();
    setTimeout(() => {
      tg.expand();
    }, SHORT_TIMEOUT_TRESHOLD);
  }, []);

  // if(!isAuth) {
  //   return <Signup isLoaded={isLoaded} />
  // }

  //TODO: Decompose MainPage
  //TODO: Move preloader in widgets
  return (
    <div className="App">
      {isLoaded ? (
        <Routes>
          <Route
            path="/"
            element={
              isAuth ? (
                <Game currentID={Number(currentID)} authId={authId} />
              ) : (
                <Signup isLoaded={isLoaded} />
              )
            }
          />
        </Routes>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default App;
