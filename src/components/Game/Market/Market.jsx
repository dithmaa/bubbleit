import React, { useState } from "react";

import marketBig from "../../../assets/img/market_icon_big.png";
import BoostPage from "./BoostPage/BoostPage";
import MarketPage from "./MarketPage/MarketPage";

function Market({
  toShort,
  handleBoosting,
  currentScore,
  boostsLists,
  setShowMenu,
  setShownMarket,
  shownScore,
  currentOpenedBoost,
  setCurrentOpenedBoost,
  frontEndBoosts,
  showBoosts,
  isNowBoosting,
  boostImg1,
}) {
  const [isShowBoostPage, setShowBoostPage] = useState(0);

  const handleShowBoostPage = (currentPage) => {
    setShowBoostPage(true);
    setCurrentOpenedBoost(currentPage);

    // setShownMarket(false);
  };
  const handleBackMarket = () => {
    setShownMarket(false);
    setShowMenu(true);
  };
  const handleBackBoost = () => {
    setShowBoostPage(false);
  };
  return (
    <div className="market">
      {isShowBoostPage ? (
        <BoostPage
          handleBackBoost={handleBackBoost}
          frontEndBoosts={frontEndBoosts}
          currentOpenedBoost={currentOpenedBoost}
          boostsLists={boostsLists}
          boostImg1={boostImg1}
          currentScore={currentScore}
          handleBoosting={handleBoosting}
          shownScore={shownScore}
          toShort={toShort}
          isNowBoosting={isNowBoosting}
        />
      ) : (
        ""
      )}
      <div className="container" style={{ alignItems: "start" }}>
        <button className="back" onClick={handleBackMarket}>
          Назад
        </button>
      </div>
      {!isShowBoostPage ? (
        <MarketPage
          marketBig={marketBig}
          boostImg1={boostImg1}
          shownScore={shownScore}
          toShort={toShort}
          boostsLists={boostsLists}
          showBoosts={showBoosts}
          handleShowBoostPage={handleShowBoostPage}
          frontEndBoosts={frontEndBoosts}
          currentScore={currentScore}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Market;
