import { useCallback, useEffect, useState } from "react";

import { NavLink, Route, Router, Routes } from "react-router-dom";
import Game from "./components/Game/Game";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";
import axios from "axios";

function App() {
  const [isAuth, setAuth] = useState(
    localStorage.getItem("isAuth") ? localStorage.getItem("isAuth") : false
  );
  const [authId, setAuthId] = useState(
    localStorage.getItem("authId") ? localStorage.getItem("authId") : 0
  );
  const hashedId = authId.slice(3).replace(/\D/g, "") / 932;
  console.log(hashedId);
  const [userScore, setUserScore] = useState();
  useEffect(() => {
    axios
      .get(
        `https://65eafaa243ce16418932f611.mockapi.io/popit/popit?id=${hashedId}`
      )
      .then(({ data }) => {
        if (Number(data[0].clickAmount) >= 1000000) {
          document.querySelector("body").classList.add("green");
        }
      });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Game authId={authId} /> : <Signup />}
        />
        {/* <Route
          path="/login"
          element={isAuth ? <Game authId={authId} /> : <Signin />}
        /> */}
      </Routes>
    </div>
  );
}

export default App;
