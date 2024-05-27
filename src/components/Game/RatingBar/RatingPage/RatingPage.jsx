import React, { useEffect, useState } from "react";
import styles from "./RatingPage.module.scss";
import axios from "axios";
import goldCup from "../../../../assets/img/gold.png";
import silverCup from "../../../../assets/img/silver.png";
import bronzeCup from "../../../../assets/img/bronze.png";

const tg = window.Telegram.WebApp;

function RatingPage({ closeRating, currentID }) {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  // const [isHideForm, setHideForm] = useState(
  //   localStorage.getItem("isChangedName")
  //     ? localStorage.getItem("isChangedName")
  //     : false
  // );
  // const [currentUserId, setCurrentUserId] = useState(
  //   localStorage.getItem("authId")
  // );

  // const hashedId = currentUserId.slice(3).replace(/\D/g, "") / 932;

  const handleTyping = (e) => {
    setNewName(e.target.value);
  };
  const createName = (e) => {
    e.preventDefault();
    console.log("sended");
    localStorage.setItem("isChangedName", true);
    axios
      .put(
        `https://65eafaa243ce16418932f611.mockapi.io/popit/popit/${currentID}`,
        {
          name: newName,
        }
      )
      .then(() => {
        // setHideForm(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  };
  useEffect(() => {
    axios
      .get(
        "https://65eafaa243ce16418932f611.mockapi.io/popit/popit?sortBy=clickAmount&order=desc"
      )
      .then(({ data }) => {
        setUsers(data);
      });
  }, []);
  return (
    <div className={styles.root}>
      <div className="container" style={{ alignItems: "start" }}>
        <button onClick={closeRating} className="back">
          Назад
        </button>
      </div>
      <div className="container">
        <form onSubmit={createName} className={styles.setName}>
          <div className={styles.setNamePlace}>
            <input
              maxLength={10}
              minLength={2}
              type="text"
              onChange={handleTyping}
              placeholder="Введите ваше имя"
              value={newName}
              required
            />
          </div>
          <div className={styles.setNameButton}>
            <button>Сохранить</button>
          </div>
        </form>
        <h3>Рейтинг</h3>

        <ul>
          {users.map((user, key) => {
            return (
              <li
                key={key + "d832"}
                className={currentID == user.id ? styles.you : ""}
              >
                <span className={key >= 3 ? styles.num : styles.win}>
                  {key == 0 ? (
                    <img style={{ width: "24px" }} src={goldCup} />
                  ) : key == 1 ? (
                    <img style={{ width: "24px" }} src={silverCup} />
                  ) : key == 2 ? (
                    <img style={{ width: "24px" }} src={bronzeCup} />
                  ) : (
                    key + 1
                  )}
                </span>
                <div className={styles.avatarArea}>
                  {user.tg_username != "none" ? (
                    <img
                      alt={"o"}
                      className={styles.avatar}
                      src={`https://t.me/i/userpic/320/${user.tg_username}.jpg`}
                      width="40px"
                      height="40px"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "100px",
                      }}
                    />
                  ) : (
                    <img
                      alt={"o"}
                      className={styles.avatar}
                      src={
                        "https://bubbleit.vercel.app/static/media/icon-boost-1.4bcfcc1e3a733fb1b398.png"
                      }
                      width="40px"
                      height="40px"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "100px",
                      }}
                    />
                  )}
                </div>

                {/* <span>{user.tg_username.slice(0, 1).toUpperCase()}</span> */}
                <span className={styles.rate}>{user.clickAmount}</span>
                <span className={styles.userName}>{user.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default RatingPage;
