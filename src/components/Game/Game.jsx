import React, { useCallback, useEffect, useState } from "react";
import boostImg1 from "../../assets/img/icon-boost-1.png";
import popitImg from "../../assets/img/popi.png";
import marketIcon from "../../assets/img/market_icon.png";
import friendIcon from "../../assets/img/friend_icon.png";

import preloaderImg from "../../assets/img/loading.gif";

import axios from "axios";
import debounce from "lodash.debounce";

import { frontEndBoosts } from "./frontEndBoosts";
import Market from "./Market/Market";
import GamePage from "./GamePage/GamePage";
import Preloader from "./Preloader/Preloader";
import { animateScore, toShort } from "./handleCount";
import RatingPage from "./RatingBar/RatingPage/RatingPage";
import Challenges from "./Challenges/Challenges";

const tg = window.Telegram.WebApp;

function Game({ currentID = 1 }) {
  // Loading Info
  const [isLoadedApp, setLoaded] = useState(false);

  // Auth Info
  const userID = currentID;

  // Получаем пользователя из БД и сохраняем его данные в FrontEnd часть

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/${userID}`)
      .then(({ data }) => {
        setScore(data.clickAmount);
        setClickPerOne(data.clickPerOne);
        setBoostsLists(data.boosts);
        setShowBoosts(data.showBoosts);

        setTimeout(() => {
          setLoaded(true);
        }, 500);
      })
      .catch((err) => {
        window.location.reload();
      });
  }, []);

  // Бусты | Маркет
  const [showBoosts, setShowBoosts] = useState(1); // Сколько бустов показывать пользователю, остальные под замком
  const [boostsLists, setBoostsLists] = useState([]); // Бусты из базы данных. По умолчанию пустой массив
  const [isNowBoosting, setIsNowBoosting] = useState(0);
  const [currentOpenedBoost, setCurrentOpenedBoost] = useState(0);

  const buyBoost = useCallback(
    debounce((newBoostVal, newBoostLists, newScore, newShowBoosts) => {
      axios.put(`${process.env.REACT_APP_API_URL}/${userID}`, {
        clickPerOne: newBoostVal,
        clickAmount: newScore,
        boosts: newBoostLists,
        showBoosts: newShowBoosts,
      });
    }, 200),
    []
  );

  // Очки | Клики
  const [currentScore, setScore] = useState(0);
  const [clickPerOne, setClickPerOne] = useState(1);
  const [shownScore, setShown] = useState(0);

  useEffect(() => animateScore(currentScore, setShown), [isLoadedApp]);

  const increaseCount = useCallback(
    debounce((num) => {
      axios.put(`${process.env.REACT_APP_API_URL}/${userID}`, {
        clickAmount: num,
      });
    }, 1400),
    []
  );

  const handleBubbleClick = (rowIndex, colIndex, setBubbleStates) => {
    if (percent > 0) {
      let newPercent = percent;
      newPercent -= 3;
      handlePercent(newPercent);

      tg.HapticFeedback.impactOccurred("rigid");

      const newBubbleStates = [...bubbleStates];
      newBubbleStates[rowIndex][colIndex] =
        !newBubbleStates[rowIndex][colIndex];
      setBubbleStates(newBubbleStates);
      setEnergyWait(true);

      energyDebounce();
      setScore((prevScore) => {
        prevScore = Number(clickPerOne) + Number(prevScore);
        increaseCount(prevScore);
        setShown(prevScore);
        return prevScore;
      });
    } else {
      setPercent(0);
    }
  };

  const handleBoosting = () => {
    const boostELem = boostsLists[currentOpenedBoost];
    const pricePercent = boostELem.price * 0.1;

    const newBoostPrice = Math.floor(pricePercent + boostELem.price);
    const newBoostLevel = 1 + boostELem.level;
    const newScore = currentScore - boostELem.price;

    const newBoostLists = boostsLists.filter((boost) => {
      if (boost.id != boostELem.id) {
        // Удаляю из массива буст который прокачали, чтобы снова запушить
        return true;
      }
    });
    newBoostLists.push(boostELem);
    newBoostLists.sort((a, b) => a.id - b.id);
    boostELem.price = newBoostPrice;
    boostELem.level = newBoostLevel;
    setScore(newScore);
    setShown(newScore);
    let newBoostVal = frontEndBoosts[currentOpenedBoost].power + clickPerOne;

    if (1 + currentOpenedBoost === showBoosts) {
      const newShowBoosts = showBoosts + 1;
      setShowBoosts(newShowBoosts);
      buyBoost(newBoostVal, newBoostLists, newScore, newShowBoosts);
    } else {
      buyBoost(newBoostVal, newBoostLists, newScore, showBoosts);
    }

    setIsNowBoosting(true);
    setClickPerOne(newBoostVal);
    setTimeout(() => {
      setIsNowBoosting(false);
    }, 900);
  };

  // Интерфейс игры

  //#1 Открытие / закрытие интерфейса
  const [isShowMenu, setShowMenu] = useState(1);
  const [isShowMarket, setShownMarket] = useState(false);
  const [isShowRating, setShownRating] = useState(false);
  const [isShowPresent, setShowPresent] = useState(0);

  const handleShowPresent = () => {
    setShowPresent(!isShowPresent);
  };
  const closePresent = () => {
    setShowPresent(!isShowPresent);
  };

  const handleShowMarket = () => {
    document.querySelector("body").classList.remove("green");
    setShownMarket(true);
    setShowMenu(false);
  };

  const closeRating = () => {
    setShownRating(false);
  };

  //#2 Поп-ит
  const [bubbleStates, setBubbleStates] = useState(
    Array.from({ length: 6 }, () => Array(6).fill(false))
  );

  //#3 Шкала энергии

  const [percent, setPercent] = useState(100);
  const [energyWait, setEnergyWait] = useState(true);

  const handlePercent = (value) => {
    // console.log(value);
    setPercent(value);
  };
  const energyDebounce = useCallback(
    debounce(() => {
      setEnergyWait(false);
    }, 800),
    []
  );

  return (
    <>
      {isShowPresent ? (
        <Challenges currentID={currentID} closePresent={closePresent} />
      ) : (
        ""
      )}
      {isShowRating ? (
        <RatingPage currentID={currentID} closeRating={closeRating} />
      ) : (
        ""
      )}
      {isShowMarket ? (
        <Market
          currentScore={currentScore}
          toShort={toShort}
          handleBoosting={handleBoosting}
          clickPerOne={clickPerOne}
          boostsLists={boostsLists}
          setShownMenu={setShowMenu}
          setShownMarket={setShownMarket}
          shownScore={shownScore}
          currentOpenedBoost={currentOpenedBoost}
          setCurrentOpenedBoost={setCurrentOpenedBoost}
          frontEndBoosts={frontEndBoosts}
          showBoosts={showBoosts}
          isNowBoosting={isNowBoosting}
          boostImg1={boostImg1}
          setShowMenu={setShowMenu}
        />
      ) : (
        ""
      )}
      {isLoadedApp ? (
        <GamePage
          currentID={currentID}
          isShowPresent={isShowPresent}
          handleShowPresent={handleShowPresent}
          isShowMarket={isShowMarket}
          shownScore={shownScore}
          toShort={toShort}
          popitImg={popitImg}
          bubbleStates={bubbleStates}
          handleBubbleClick={handleBubbleClick}
          isShowMenu={isShowMenu}
          handleShowMarket={handleShowMarket}
          marketIcon={marketIcon}
          setBubbleStates={setBubbleStates}
          increaseCount={increaseCount}
          setShown={setShown}
          clickPerOne={clickPerOne}
          setScore={setScore}
          handlePercent={handlePercent}
          percent={percent}
          energyWait={energyWait}
          setShownRating={setShownRating}
          currentScore={currentScore}
        />
      ) : (
        <Preloader popitImg={popitImg} preloaderImg={preloaderImg} />
      )}
    </>
  );
}

export default Game;
