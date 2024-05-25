import React, { useEffect, useRef, useState } from "react";
import styles from "./Signup.module.scss";
import axios from "axios";
const tg = window.Telegram.WebApp;

function Signup() {
  const [lastId, setLastId] = useState(0);
  const [tgID, setTgID] = useState(0);
  const [isDisabledNow, setDisabled] = useState(false);
  const [curva, setCurva] = useState(0);
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
    {
      id: 6,
      price: 15000000,
      level: 0,
    },
  ];
  const refIdUrl = window.location.search
    ? isNaN(Number(window.location.search.replace("?", "").slice(4)))
      ? 0
      : Number(window.location.search.replace("?", "").slice(4)) / 932
    : 0;

  console.log("refIdUrl", refIdUrl);
  useEffect(() => {
    if (curva != 0) {
      axios
        .get(
          `https://65eafaa243ce16418932f611.mockapi.io/popit/popit?tg_id=${tgID}`
        )
        .then(({ data }) => {
          if (data) {
            setCurva(data.tg_id);
          } else {
            setCurva(9999);
          }
        });
    }
  }, [tgID]); //Проверка есть ли такой пользователь тг
  useEffect(() => {
    setTgID(tg.initDataUnsafe?.user?.id);
    axios
      .get("https://65eafaa243ce16418932f611.mockapi.io/popit/popit")
      .then(({ data }) => {
        setLastId(data[data.length - 1].id);
      });
  }, []);

  useEffect(() => {
    notifyIfRefLink();
  }, []);

  const [prevScoresFromRef, setPrevScoresFromRef] = useState([]);

  console.log("prevScoresFromRef ", prevScoresFromRef);

  const notifyInviter = (e) => {
    console.log("s", prevScoresFromRef);
    const newUserId = Number(lastId) + 1;

    prevScoresFromRef.push({ id: newUserId, score: 0 });
    console.log(prevScoresFromRef);
    axios.put(
      `https://65eafaa243ce16418932f611.mockapi.io/popit/popit/${refIdUrl}`,
      {
        scoresFromRef: prevScoresFromRef,
      }
    );
  };

  const notifyIfRefLink = () => {
    refIdUrl == 0
      ? console.log("Не реферальная ссылка")
      : axios
          .get(
            `https://65eafaa243ce16418932f611.mockapi.io/popit/popit/${refIdUrl}`
          )
          .then(({ data }) => {
            setPrevScoresFromRef(data.scoresFromRef);
          });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserId = Number(lastId) + 1;

    const newName = "Игрок" + newUserId;
    const newUser = {
      name: newName,
      tg_id: tgID,
      refId: refIdUrl, // тот кто пригласил
      clickAmount: 0,
      clickPerOne: 1,
      showBoosts: 1,
      boosts: boostsInitial,
      scoresFromRef: [],
    };

    const hashedId = "y10dwpdDxwq" + newUserId * 932 + "xdeDed";
    localStorage.setItem("authId", hashedId);
    localStorage.setItem("isAuth", true);
    // localStorage.setItem("ref", refIdUrl);
    setDisabled(!isDisabledNow);

    // console.log(newUserId);
    setTimeout(() => {
      axios
        .post(
          "https://65eafaa243ce16418932f611.mockapi.io/popit/popit/",
          newUser
        )
        .then(() => {
          if (refIdUrl != 0 || refIdUrl) {
            notifyInviter();
          }
        });
    }, 0);
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };

  return (
    <div className={styles.root}>
      <div style={{ color: "#fff" }}>Curva: {curva}</div>
      <button onClick={handleSubmit}>Регистрация</button>
    </div>
  );
}

export default Signup;
