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
  const [tgUsername, setTgUsername] = useState(
    tg.initDataUnsafe?.user?.username || "none"
  );
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
  const refIdUrl = Number(window.location.search.replace("?", "").slice(4));
  // console.log("refIdUrl", refIdUrl);

  console.log("lastId", lastId);

  const auth = async () => {
    try {
      const authFunc = await axios
        .get("http://localhost:9999/users")
        .then(({ data }) => {
          setLastId(data[data.length - 1].id);
          setTimeout(() => {
            handleSubmit(data[data.length - 1].id);
          }, 300);
        });
    } catch (err) {
      console.log(err);
    }
  };
  console.log("lastID", lastId);
  useEffect(() => {
    auth();
  }, []);

  useEffect(() => {
    notifyIfRefLink();
  }, []);

  const [prevScoresFromRef, setPrevScoresFromRef] = useState([]);

  // console.log("prevScoresFromRef ", prevScoresFromRef);

  const notifyInviter = (narana) => {
    // console.log("s", prevScoresFromRef);
    const newUserId = Number(narana) + 1;

    prevScoresFromRef.push({ id: newUserId, score: 0 });
    // console.log(prevScoresFromRef);
    axios.put(`http://localhost:9999/users/${refIdUrl}`, {
      scoresFromRef: prevScoresFromRef,
    });
  };

  const notifyIfRefLink = () => {
    refIdUrl == 0
      ? console.log() // no ref link
      : axios
          .get(`http://localhost:9999/users/${refIdUrl}`)
          .then(({ data }) => {
            setPrevScoresFromRef(data.scoresFromRef);
          });
  };
  const handleSubmit = (narana) => {
    // e.preventDefault();
    const newUserId = Number(narana) + 1;

    const newName = "Игрок" + newUserId;
    const newUser = {
      name: newName,
      tg_username: tgUsername,
      tg_id: tgID,
      refId: refIdUrl, // тот кто пригласил
      clickAmount: 0,
      clickPerOne: 1,
      showBoosts: 1,
      isCompletedMission: false,
      isCompletedMiss: false,
      boosts: boostsInitial,
      scoresFromRef: [],
    };
    setDisabled(!isDisabledNow);

    // console.log(newUserId);
    setTimeout(() => {
      axios
        .post("http://localhost:9999/users", newUser)
        .then(() => {
          // if (refIdUrl != 0 || refIdUrl) {
          //   notifyInviter(narana);
          // }
          setTimeout(() => {
            window.location.reload();
          }, 2800);

          alert("Все ок");
        })
        .catch((err) => {
          alert("База данных полностью заполнена");
        });
    }, 0);
  };

  return (
    <div className={styles.root}>
      <Preloader popitImg={popitImg} preloaderImg={preloaderImg} />
    </div>
  );
}

export default Signup;
