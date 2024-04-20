import React, { useState } from "react";

import marketBig from "../../../assets/img/market_icon_big.png";
import BoostPage from "./BoostPage/BoostPage";
import MarketPage from "./MarketPage/MarketPage";

import boostImage1 from "../../../assets/img/boosts/1.png";
import boostImage2 from "../../../assets/img/boosts/2.png";
import boostImage3 from "../../../assets/img/boosts/3.png";
import boostImage4 from "../../../assets/img/boosts/4.png";
import boostImage5 from "../../../assets/img/boosts/5.png";
import boostImage6 from "../../../assets/img/boosts/6.png";
import boostImage7 from "../../../assets/img/boosts/7.png";

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
    document.querySelector("body").classList.add("green");
    console.log("s");
    setShownMarket(false);
    setShowMenu(true);
  };
  const handleBackBoost = () => {
    setShowBoostPage(false);
  };

  const images = [
    boostImage1,
    boostImage2,
    boostImage3,
    boostImage4,
    boostImage5,
    boostImage6,
    boostImage7,
  ];
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
          images={images}
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
          images={images}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Market;
