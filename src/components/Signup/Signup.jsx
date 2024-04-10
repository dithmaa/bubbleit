import React, { useEffect, useRef, useState } from "react";
import styles from "./Signup.module.scss";
import axios from "axios";
function Signup() {
  const [lastId, setLastId] = useState(0);
  const [isDisabledNow, setDisabled] = useState(false);
  const boostsInitial = [
    {
      id: 1,
      price: 100,
      level: 0,
    },
    {
      id: 2,
      price: 8000,
      level: 0,
    },
    {
      id: 3,
      price: 50000,
      level: 0,
    },
    {
      id: 4,
      price: 1000000,
      level: 0,
    },
    {
      id: 5,
      price: 5000000,
      level: 0,
    },
  ];

  useEffect(() => {
    axios
      .get("https://65eafaa243ce16418932f611.mockapi.io/popit/popit")
      .then(({ data }) => {
        setLastId(data[data.length - 1].id);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserId = Number(lastId) + 1;

    const newName = "Игрок" + newUserId;
    const newUser = {
      name: newName,
      clickAmount: 0,
      clickPerOne: 1,
      showBoosts: 1,
      boosts: boostsInitial,
    };

    axios.post(
      "https://65eafaa243ce16418932f611.mockapi.io/popit/popit/",
      newUser
    );

    const hashedId = "y10dwpdDxwq" + newUserId * 932 + "xdeDed";
    localStorage.setItem("authId", hashedId);
    localStorage.setItem("isAuth", true);
    setDisabled(!isDisabledNow);

    // console.log(newUserId);
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };

  return (
    <div className={styles.root}>
      <button disabled={isDisabledNow} onClick={handleSubmit}>
        Создать аккаунт
      </button>
    </div>
  );
}

export default Signup;
