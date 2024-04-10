import React from "react";
import styles from "./RatingBar.module.css";

function RatingBar({ onClick }) {
  return (
    <div onClick={onClick} className={styles.root}>
      Очки остальных игроков
    </div>
  );
}

export default RatingBar;
