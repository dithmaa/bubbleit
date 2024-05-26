import React, { useEffect, useRef, useState } from "react";
import styles from "./Signup.module.scss";
import axios from "axios";
import Preloader from "../Game/Preloader/Preloader";

import preloaderImg from "../../assets/img/loading.gif";
import popitImg from "../../assets/img/popi.png";

const tg = window.Telegram.WebApp;

function Signup({ isLoadeds }) {
  const [lastId, setLastId] = useState(0);
  const [tgID, setTgID] = useState(tg.initDataUnsafe?.user?.id || 40432);
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

  // console.log("refIdUrl", refIdUrl);

  useEffect(() => {
    axios
      .get("https://65eafaa243ce16418932f611.mockapi.io/popit/popit")
      .then(({ data }) => {
        setLastId(data[data.length - 1].id);

        handleSubmit();
      });
  }, []);

  useEffect(() => {
    notifyIfRefLink();
  }, []);

  const [prevScoresFromRef, setPrevScoresFromRef] = useState([]);

  // console.log("prevScoresFromRef ", prevScoresFromRef);

  const notifyInviter = (e) => {
    // console.log("s", prevScoresFromRef);
    const newUserId = Number(lastId) + 1;

    prevScoresFromRef.push({ id: newUserId, score: 0 });
    // console.log(prevScoresFromRef);
    axios.put(
      `https://65eafaa243ce16418932f611.mockapi.io/popit/popit/${refIdUrl}`,
      {
        scoresFromRef: prevScoresFromRef,
      }
    );
  };

  const notifyIfRefLink = () => {
    refIdUrl == 0
      ? console.log() // no ref link
      : axios
          .get(
            `https://65eafaa243ce16418932f611.mockapi.io/popit/popit/${refIdUrl}`
          )
          .then(({ data }) => {
            setPrevScoresFromRef(data.scoresFromRef);
          });
  };
  const handleSubmit = () => {
    // e.preventDefault();
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
    }, 2500);
  };

  return (
    <div className={styles.root}>
      <Preloader popitImg={popitImg} preloaderImg={preloaderImg} />
    </div>
  );
}

export default Signup;
