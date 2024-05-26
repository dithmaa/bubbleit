import React, { useEffect } from "react";
import styles from "./Challanges.module.scss";
import avatar from "../../../assets/img/avatar1.jpg";
import loadGif from "../../../assets/img/loading.gif";
import { useState } from "react";
import axios from "axios";

export default function Challenges({ closePresent, currentID }) {
  const [isShowBtnLoad, setShowBtnLoad] = useState(0);
  const [isCompleted, setCompleted] = useState(0);
  const [clickAmountUser, setClickAmountUser] = useState(0);
  useEffect(() => {
    axios
      .get(
        `https://65eafaa243ce16418932f611.mockapi.io/popit/popit/${currentID}`
      )
      .then(({ data }) => {
        setClickAmountUser(data.clickAmount);
      });
  }, []);
  console.log(clickAmountUser);
  const handleCheckSub = (e) => {
    e.preventDefault();
    window.open("https://t.me/cryptopoonn");
    setTimeout(() => {
      setShowBtnLoad(1);
    }, 500);
    const newClickAmount = clickAmountUser + 1000000;
    setTimeout(() => {
      axios.put(
        `https://65eafaa243ce16418932f611.mockapi.io/popit/popit/${currentID}`,
        {
          clickAmount: newClickAmount,
        }
      );
    }, 17000);
    setTimeout(() => {
      setCompleted(1);
      setShowBtnLoad(0);
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    }, 20000);
  };
  return (
    <div className={styles.root}>
      <div className="container" style={{ alignItems: "start" }}>
        <button onClick={closePresent} className="back">
          Назад
        </button>
      </div>
      <div className="container common">
        <h2 className="h2">Задания</h2>
        <p>Выполняй задания и получай пузырики!</p>
        <div className={styles.present}>
          <div className={styles.present__item}>
            <div className="present__avatar">
              <img className={styles.avatar} src={avatar} alt="" />
            </div>
            <div className={styles.present__title}>
              <span>Крипто Пон</span>
              <span>Награда: 1 млн пузырей</span>
            </div>
            <button
              disabled={isCompleted}
              onClick={handleCheckSub}
              href="#"
              className={styles.getBtn}
            >
              {isShowBtnLoad ? (
                <img className={styles.getBtnLoad} src={loadGif} alt="load" />
              ) : (
                <span>{isCompleted ? "Выполнено" : "Подписаться"}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
