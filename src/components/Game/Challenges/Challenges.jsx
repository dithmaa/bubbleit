import React, { useEffect } from "react";
import styles from "./Challanges.module.scss";
import avatar from "../../../assets/img/avatar1.jpg";
import avatar2 from "../../../assets/img/avatar2.jpg";
import loadGif from "../../../assets/img/loading.gif";
import { useState } from "react";
import axios from "axios";
const tg = window.Telegram.WebApp;

export default function Challenges({ closePresent, currentID }) {
  const [isShowBtnLoad, setShowBtnLoad] = useState(0);
  const [isShowBtnLoad2, setShowBtnLoad2] = useState(0);
  const [isCompleted, setCompleted] = useState(0);
  const [isCompleted2, setCompleted2] = useState(0);
  const [alreadyCompleted, setAlreadyCompleted] = useState(0);
  const [alreadyCompleted2, setAlreadyCompleted2] = useState(0);
  const [clickAmountUser, setClickAmountUser] = useState(0);
  useEffect(() => {
    axios.get(`http://localhost:9999/users/${currentID}`).then(({ data }) => {
      setAlreadyCompleted(data.isCompletedMission);
      setAlreadyCompleted2(data.isCompletedMiss);
      setClickAmountUser(data.clickAmount);
    });
  }, []);
  console.log("alreadyCompleted2", alreadyCompleted2);
  const handleCheckSub = (e) => {
    e.preventDefault();
    tg.HapticFeedback.impactOccurred("rigid");

    window.open("https://t.me/cryptopoonn");
    setTimeout(() => {
      setShowBtnLoad(1);
    }, 500);
    const newClickAmount = clickAmountUser + 1000000;
    setTimeout(() => {
      axios.put(`http://localhost:9999/users/${currentID}`, {
        isCompletedMission: true,
        clickAmount: newClickAmount,
      });
    }, 17000);
    setTimeout(() => {
      setCompleted(1);
      setShowBtnLoad(0);
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    }, 20000);
  };
  const handleCheckSub2 = (e) => {
    e.preventDefault();
    tg.HapticFeedback.impactOccurred("rigid");

    window.open("https://t.me/bubbleit_group");
    setTimeout(() => {
      setShowBtnLoad2(1);
    }, 500);
    const newClickAmount = clickAmountUser + 1000000;
    setTimeout(() => {
      axios.put(`http://localhost:9999/users/${currentID}`, {
        isCompletedMiss: true,
        clickAmount: newClickAmount,
      });
    }, 17000);
    setTimeout(() => {
      setCompleted2(1);
      setShowBtnLoad2(0);
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
            {!alreadyCompleted ? (
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
            ) : (
              <button className={styles.getBtn} disabled={true}>
                <span>Выполнено</span>
              </button>
            )}
          </div>
          <div className={styles.present__item}>
            <div className="present__avatar">
              <img className={styles.avatar} src={avatar2} alt="" />
            </div>
            <div className={styles.present__title}>
              <span>Bubble IT</span>
              <span>Награда: 1 млн пузырей</span>
            </div>
            {!alreadyCompleted2 ? (
              <button
                disabled={isCompleted2}
                onClick={handleCheckSub2}
                href="#"
                className={styles.getBtn}
              >
                {isShowBtnLoad2 ? (
                  <img className={styles.getBtnLoad} src={loadGif} alt="load" />
                ) : (
                  <span>{isCompleted2 ? "Выполнено" : "Подписаться"}</span>
                )}
              </button>
            ) : (
              <button className={styles.getBtn} disabled={true}>
                <span>Выполнено</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
