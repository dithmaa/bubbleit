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

  console.log("lastId", lastId);

  const auth = async () => {
    try {
      const authFunc = await axios
        .get(`${process.env.REACT_APP_API_URL}`)
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

  const handleSubmit = (arnabaka) => {
    const newUserId = Number(arnabaka) + 1;

    const newName = "Игрок" + newUserId;
    const newUser = {
      name: newName,
      tg_username: tgUsername,
      tg_id: tgID,
      clickAmount: 0,
      clickPerOne: 1,
      showBoosts: 1,
      isCompletedMission: false,
      isCompletedMiss: false,
      boosts: boostsInitial,
      scoresFromRef: [],
    };
    setDisabled(!isDisabledNow);

    setTimeout(() => {
      axios.post(`${process.env.REACT_APP_API_URL}`, newUser).then(() => {
        // console.log("success");
      });
    }, 0);
    setTimeout(() => {
      window.location.reload();
    }, 2800);
  };

  return (
    <div className={styles.root}>
      <Preloader popitImg={popitImg} preloaderImg={preloaderImg} />
    </div>
  );
}

export default Signup;
