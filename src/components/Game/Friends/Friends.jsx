import React, { useState } from "react";
import styles from "./Friends.module.scss";
const tg = window.Telegram.WebApp;

function Friends({
  friendsList,
  closeFriends,
  currentScore,
  harvestRef,
  copyIcon,
  currentID,
}) {
  const [isDisabled, setDisabled] = useState(false);
  const [showMessage, setShowMessage] = useState(0);

  const handleHarvest = (id, score) => {
    harvestRef(id, score);
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 500);
  };

  const linkID = currentID ? currentID : 0;
  const refLink = window.location.origin + `?ref=${linkID}`;

  console.log("refLink", refLink);
  const copyRef = () => {
    navigator.clipboard
      .writeText(refLink)
      .then(() => {
        setTimeout(() => {
          setShowMessage(!showMessage);
          setTimeout(() => {
            setShowMessage(false);
          }, 1200);
        }, 150);
        // Получилось!
      })
      .catch((err) => {
        console.log("Something went wrong", err);
      });
  };

  return (
    <div className={styles.root}>
      <div className={showMessage ? "message show" : "message"}>
        Ссылка скопирована
      </div>
      <div className="container" style={{ alignItems: "start" }}>
        <button onClick={closeFriends} className="back">
          Назад
        </button>
      </div>
      <div className="container">
        <h2>Друзья</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          Ваш текущий рейтинг:{" "}
          <span
            style={{ fontWeight: "bold", fontSize: "20px", marginLeft: "10px" }}
          >
            {currentScore}
          </span>
        </div>
        <div
          className="refPlace"
          style={{
            border: "1px solid rgba(255,255,255,0.5)",
            padding: "10px 20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <h3
            style={{
              marginBottom: "0",
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            Ваша реферальная ссылка
          </h3>
          <div
            style={{
              border: "1px solid #fff",
              borderRadius: "20px",
              padding: "8px 14px",
              margin: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ opacity: "0.4" }}>{refLink}</span>
            <img
              style={{
                filter: "invert(1)",
                width: "25px",
                cursor: "pointer",
                marginLeft: "6px",
              }}
              src={copyIcon}
              alt="Copy Icon"
              className={styles.copy}
              onClick={copyRef}
            />
          </div>
          <span
            style={{
              textAlign: "center",
              display: "inline-block",
              fontSize: "13px",
              margin: "16px 0",
            }}
          >
            Каждый приведённый друг будет приносить 15% от каждого клика
          </span>
        </div>
        <div className={styles.friends}>
          {friendsList.length <= 0 ? "Нет приглашенных друзей" : ""}
          {friendsList.map((item, key) => {
            return (
              <div key={key} className={styles.friends__item}>
                <div className={styles.friends__id}>ID друга: {item.id}</div>
                <div className={styles.friends__score}>
                  Друг принес вам {item.score}
                </div>
                {item.score > 0 ? (
                  <button
                    className={styles.btn}
                    onClick={() => handleHarvest(item.id, item.score)}
                    disabled={isDisabled}
                  >
                    Забрать
                  </button>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Friends;
