import React, { useEffect, useState } from "react";
import styles from "./RatingBar.module.css";
import axios from "axios";
import goldCup from "../../../assets/img/gold.png";

function RatingBar({ onClick }) {
  const [firstUser, setFirstUser] = useState([
    { clickAmount: 10048199, id: 1, name: "Name" },
  ]);
  // console.log(firstUser[0]);
  useEffect(() => {
    axios
      .get(
        "http://localhost:9999/users?sortBy=clickAmount&order=desc&limit=1&page=1"
      )
      .then(({ data }) => {
        setFirstUser(data);
      });
  }, []);
  return (
    <div onClick={onClick} className={styles.root}>
      <img style={{ width: "20px" }} src={goldCup} alt="gold cup" />
      <span
        style={{
          paddingLeft: "20px",
          fontSize: "18px",
          color: "#ce7aff",
          fontWeight: "bold",
        }}
      >
        {firstUser[0].clickAmount}
      </span>
      <span style={{ fontSize: "14px", paddingLeft: "10px" }}>
        {firstUser[0].name}
      </span>
    </div>
  );
}

export default RatingBar;
