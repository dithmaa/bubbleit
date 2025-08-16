import React, { useState } from "react";

import boostImageLock from "../../../../assets/img/boosts/lock.png";
import BoostItem from "./BoostItem/BoostItem";
import BoostSkeletton from "./BoostSkeletton/BoostSkeletton";

function MarketPage({
  frontEndBoosts,
  marketBig,
  shownScore,
  toShort,
  boostImg1,
  boostsLists,
  showBoosts,
  handleShowBoostPage,
  currentScore,
  images,
}) {
  const [isBoostLoaded, setBoostLoad] = useState(false);
  useState(() => {
    setTimeout(() => {
      setBoostLoad(1);
    }, 1000);
  }, []);
  return (
    <div className="container">
      <div className="market-offer">
        <img src={marketBig} />
        <h2>Бусты</h2>
      </div>
      <div className="current-score-place">
        <span>Твой баланс:</span>
        <p>
          <img className="buba-score-icon" src={boostImg1} alt="Buba Icon" />
          {shownScore < 1000000 ? shownScore : toShort(shownScore)}
        </p>
      </div>
      <div className="market-options">
        <h4 className="market-options__title">Мощность клика</h4>
        <div className="market-options__wrapper">
          {isBoostLoaded
            ? boostsLists
              ? boostsLists.map((boost, index) => {
                  return (
                    <BoostItem
                      boost={boost}
                      showBoosts={showBoosts}
                      index={index}
                      handleShowBoostPage={handleShowBoostPage}
                      boostImageLock={boostImageLock}
                      images={images}
                      frontEndBoosts={frontEndBoosts}
                      currentScore={currentScore}
                    />
                  );
                })
              : ""
            : Array(10)
                .fill(5)
                .map((item) => {
                  return (
                    <div style={{ margin: "5px 0" }}>
                      <BoostSkeletton />
                    </div>
                  );
                })}
        </div>
      </div>
    </div>
  );
}

export default MarketPage;
