import React from "react";
import styles from "./Header.module.scss";
import popitImg from "../../assets/img/popi.png";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        <img src={popitImg} alt="Popit" />
        <span>Bubble it</span>
      </div>
    </div>
  );
}

export default Header;
