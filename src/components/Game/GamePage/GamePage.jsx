import React, { useEffect } from "react";
import EnergyBar from "../EnergyBar/EnergyBar";
import RatingBar from "../RatingBar/RatingBar";

import presentIcon from "../../../assets/img/present.png";
import boostImg1 from "../../../assets/img/icon-boost-1.png";
import popitImg from "../../../assets/img/popi.png";

function GamePage({
  isShowMarket,
  shownScore,
  toShort,
  bubbleStates,
  isShowMenu,
  handleShowMarket,
  marketIcon,
  setBubbleStates,
  handleBubbleClick,
  energyWait,
  percent,
  setPercent,
  handlePercent,
  clickPerOne,
  setShownRating,
  currentScore,
  handleShowPresent,
}) {
  const energyStaminaFunc = () => {
    if (percent > 50.1) {
      setTimeout(() => {
        handlePercent(100);
      }, 3000);
    } else if (percent < 50.1) {
      setTimeout(() => {
        handlePercent(50);
        setTimeout(() => {
          handlePercent(100);
        }, 7000);
      }, 1000);
    }
  };
  useEffect(() => {
    if (percent <= 100 || !energyWait) {
      energyStaminaFunc();
    }
  }, [energyWait]);

  return (
    <div className="container">
      {!isShowMarket ? (
        <div className="game-page">
          <RatingBar onClick={() => setShownRating(true)} />

          <div
            className="res"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <span style={{ fontSize: "13px", fontWeight: 100 }}>
              Сила клика: {clickPerOne}
            </span>
            <div
              className="res-score"
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                className="buba-score-icon"
                src={boostImg1}
                alt="Buba Icon"
              />
              {shownScore < 1000000 ? shownScore : toShort(shownScore)}
            </div>
          </div>
          <div
            className="popit"
            style={{
              backgroundImage: `url(${popitImg})`,
              filter: currentScore >= 1000000 ? "invert(1)" : "",
            }}
          >
            <div className="grid">
              {bubbleStates.map((row, rowIndex) => (
                <div key={rowIndex} className="popit-row">
                  {row.map((active, colIndex) => (
                    <div
                      key={colIndex}
                      className={`cell ${active ? "active" : ""}`}
                      onClick={(event) =>
                        handleBubbleClick(
                          rowIndex,
                          colIndex,
                          setBubbleStates,
                          event
                        )
                      }
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <EnergyBar setPercent={setPercent} percent={percent} />
          {isShowMenu ? (
            <nav className="menu">
              <button className="menu__item" onClick={handleShowPresent}>
                <img src={presentIcon} alt="Present Icon" />
                <span>Задания</span>
              </button>
              <button className="menu__item" onClick={handleShowMarket}>
                <img src={marketIcon} alt="Market Icon" />
                <span>Бусты</span>
              </button>
            </nav>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default GamePage;
