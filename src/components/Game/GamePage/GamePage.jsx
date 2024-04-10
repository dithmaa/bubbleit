import React, { useEffect, useState } from "react";
import EnergyBar from "../EnergyBar/EnergyBar";
import { useCallback } from "react";
import debounce from "lodash.debounce";
import RatingBar from "../RatingBar/RatingBar";

function GamePage({
  isShowMarket,
  boostImg1,
  shownScore,
  toShort,
  bubbleStates,
  popitImg,
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
}) {
  const sFunc = () => {
    // console.log("percent", percent);
    if (percent > 50.1) {
      setTimeout(() => {
        // console.log("handle percent");
        handlePercent(100);
      }, 4000);
    } else if (percent < 50.1) {
      setTimeout(() => {
        handlePercent(50);
        setTimeout(() => {
          handlePercent(100);
        }, 30000);
      }, 3000);
    }
  };
  useEffect(() => {
    if (percent <= 100 || !energyWait) {
      sFunc();
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
            style={{ backgroundImage: `url(${popitImg})` }}
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
