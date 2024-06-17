import React, { useEffect, useState } from "react";
import styles from "./RatingPage.module.scss";
import axios from "axios";
import goldCup from "../../../../assets/img/gold.png";
import silverCup from "../../../../assets/img/silver.png";
import bronzeCup from "../../../../assets/img/bronze.png";
import RatingItem from "./RatingItem/RatingItem";
import RatingSkeletton from "./RatingSkeletton/RatingSkeletton";

const tg = window.Telegram.WebApp;

function RatingPage({ closeRating, currentID, uniqID }) {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [isUsersLoaded, setUsersLoad] = useState(false);

  const handleTyping = (e) => {
    setNewName(e.target.value);
  };
  const createName = (e) => {
    e.preventDefault();
    console.log("sended");
    localStorage.setItem("isChangedName", true);
    axios
      .put(`http://192.168.0.15:9999/users/${currentID}`, {
        name: newName,
      })
      .then(() => {
        // setHideForm(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
  };
  useEffect(() => {
    axios
      .get("http://192.168.0.15:9999/users?sortBy=clickAmount&order=desc")
      .then(({ data }) => {
        setUsers(data);
        setTimeout(() => {
          setUsersLoad(true);
        }, 1000);
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

        <ul style={{ display: "flex", flexDirection: "column" }}>
          {isUsersLoaded
            ? users.map((user, key) => {
                return (
                  <RatingItem
                    ukey={key}
                    goldCup={goldCup}
                    silverCup={silverCup}
                    bronzeCup={bronzeCup}
                    currentID={currentID}
                    user={user}
                    styles={styles}
                    uniqID={uniqID}
                  />
                );
              })
            : Array(10)
                .fill(5)
                .map((item) => {
                  return (
                    <div style={{ margin: "1px 0" }}>
                      <RatingSkeletton styles={styles} />
                    </div>
                  );
                })}
        </ul>
      </div>
    </div>
  );
}

export default RatingPage;
