import React from "react";

function BoostPage({
  handleBackBoost,
  frontEndBoosts,
  currentOpenedBoost,
  boostsLists,
  boostImg1,
  currentScore,
  handleBoosting,
  shownScore,
  toShort,
  isNowBoosting,
  images,
}) {
  return (
    <div className="boost-page">
      <div className="container" style={{ alignItems: "start" }}>
        <button className="back" onClick={handleBackBoost}>
          Назад
        </button>
      </div>

      <div className="container">
        <img src={images[currentOpenedBoost]} className="boost-picture" />
        <h3 className="h3">{boostsLists[currentOpenedBoost].title}</h3>
        <span className="boost-info">
          +{frontEndBoosts[currentOpenedBoost].power} за клик при увеличении
          уровня
        </span>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>
            <span
              className="option-price price"
              style={{
                color:
                  currentScore < boostsLists[currentOpenedBoost].price
                    ? "rgb(199 62 62)"
                    : "#5ecf52",
              }}
            >
              {boostsLists[currentOpenedBoost].price}
            </span>
          </p>

          <span className="option-level">
            <span>{boostsLists[currentOpenedBoost].level}</span> уровень
          </span>
        </div>
        <div className="boost-page__bottom">
          <div className="current-score-place" style={{ width: "100%" }}>
            <span>Твой баланс:</span>
            <p>
              <img
                className="buba-score-icon"
                src={boostImg1}
                alt="Buba Icon"
              />
              {shownScore < 1000000 ? shownScore : toShort(shownScore)}
            </p>
          </div>
          <div className="boost-btn-div" style={{ textAlign: "center" }}>
            {isNowBoosting ? (
              <button disabled={true} className="boost-btn">
                Прокачать уровень
              </button>
            ) : currentScore < boostsLists[currentOpenedBoost].price ? (
              <button
                className="boost-btn"
                style={{
                  backgroundColor: "#7d0000",
                  color: "#fff",
                  opacity: "0.5",
                }}
              >
                Не достаточный баланс
              </button>
            ) : (
              <button className="boost-btn" onClick={handleBoosting}>
                Прокачать уровень
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoostPage;
