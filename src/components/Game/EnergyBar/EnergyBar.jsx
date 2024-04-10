import React, { useState } from "react";
import styles from "./EnergyBar.module.scss";

function EnergyBar({ percent, setPercent }) {
  // console.log("Percent", percent);

  return (
    <div className={styles.root}>
      <span style={{ width: percent + "%" }}></span>
    </div>
  );
}

export default EnergyBar;
