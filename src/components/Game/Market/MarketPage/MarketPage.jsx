import React from "react";

import boostImageLock from "../../../../assets/img/boosts/lock.png";

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
          {boostsLists
            ? boostsLists.map((boost, index) => {
                return (
                  <div
                    className={
                      index >= showBoosts ? "option disabled" : "option"
                    }
                    key={index + "d8dew"}
                    onClick={() => handleShowBoostPage(index)}
                  >
                    <div className="option-img">
                      <img
                        src={
                          index >= showBoosts ? boostImageLock : images[index]
                        }
                        alt="option-img"
                      />
                    </div>
                    <div className="option-info">
                      <h5>
                        {index >= showBoosts
                          ? "???????"
                          : frontEndBoosts[index].title}
                      </h5>
                      <div className="option-info__params">
                        <span
                          className="option-price"
                          style={{
                            color:
                              currentScore < boost.price
                                ? "rgb(199 62 62)"
                                : "#5ecf52",
                          }}
                        >
                          {index >= showBoosts ? "??????" : boost.price}
                        </span>
                        <span className="option-level">
                          <span>{boost.level}</span> ур.
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}

export default MarketPage;
