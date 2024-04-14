import React, { useCallback, useEffect, useState } from "react";
import boostImg1 from "../../assets/img/icon-boost-1.png";
import popitImg from "../../assets/img/popi.png";
import marketIcon from "../../assets/img/market_icon.png";

import preloaderImg from "../../assets/img/loading.gif";
import axios from "axios";
import debounce from "lodash.debounce";

import { frontEndBoosts } from "./frontEndBoosts";
import Market from "./Market/Market";
import GamePage from "./GamePage/GamePage";
import Preloader from "./Preloader/Preloader";
import { animateScore, toShort } from "./handleCount";
import EnergyBar from "./EnergyBar/EnergyBar";
import RatingPage from "./RatingBar/RatingPage/RatingPage";

function Game({ authId }) {
  const [showBoosts, setShowBoosts] = useState(1);
  const [currentScore, setScore] = useState(0);
  const [clickPerOne, setClickPerOne] = useState(1);
  const [boostsLists, setBoostsLists] = useState([]);
  const [shownScore, setShown] = useState(0);
  const [isNowBoosting, setIsNowBoosting] = useState(0);
  const [currentOpenedBoost, setCurrentOpenedBoost] = useState(0);
  const [isShowMenu, setShowMenu] = useState(1);
  const [isShowMarket, setShownMarket] = useState(false);
  const [isShowRating, setShownRating] = useState(false);
  const [refId, setRefId] = useState(
    localStorage.getItem("ref") ? localStorage.getItem("ref") : 0
  );
  const [totalRefScore, setTotalRefScore] = useState(0);
  const [ownerRefList, setOwnerRefList] = useState([]);

  // console.log("totalRefScore", totalRefScore);

  const [bubbleStates, setBubbleStates] = useState(
    Array.from({ length: 6 }, () => Array(6).fill(false))
  );
  //unhashedID
  const hashedId = authId.slice(3).replace(/\D/g, "") / 932;

  const [percent, setPercent] = useState(100);
  const [energyWait, setEnergyWait] = useState(true);

  const [isLoadedApp, setLoaded] = useState(false);

  const increaseCount = useCallback(
    //click increase on backend
    debounce((num) => {
      axios.put(
        `https://65eafaa243ce16418932f611.mockapi.io/popit/popit/${hashedId}`,
        {
          clickAmount: num,
        }
      );
    }, 1400),
    []
  );

  // console.log(ownerRefList);

  // const giveGiftScore = useCallback(
  //   debounce((refId, totalRef) => {
  //     console.log(refId + " " + totalRef);
  //     setTotalRefScore(0);
  //     const refObj = {
  //       id: hashedId, //unhashedID
  //       giftAmount: totalRef,
  //     };
  //     axios
  //       .get(
  //         `https://65eafaa243ce16418932f611.mockapi.io/popit/popit?id=${refId}&limit=1&page=1`
  //       )
  //       .then(({ data }) => {
  //         // console.log("setOwnerRefList(data[0]);");
  //         // setOwnerRefList(data[0]);
  //         const newArr = data[0].scoresFromRef;
  //         if (newArr.length <= 0) {
  //           newArr.push(refObj);
  //         } else {
  //           newArr.filter((item) =>
  //             item.id === hashedId
  //               ? (item.giftAmount = item.giftAmount + totalRef)
  //               : newArr.push(refObj)
  //           );
  //         }

  //         axios.put(
  //           `https://65eafaa243ce16418932f611.mockapi.io/popit/popit/${refIdNum}`,
  //           {
  //             scoresFromRef: newArr,
  //           }
  //         );
  //         console.log(newArr);
  //       });
  //     const refIdNum = Number(refId);

  //     // const refList =
  //     //   ownerRefList.scoresFromRef.length == 0
  //     //     ? []
  //     //     : ownerRefList.scoresFromRef;
  //     // axios.put(
  //     //   `https://65eafaa243ce16418932f611.mockapi.io/popit/popit/${refIdNum}`,
  //     //   {
  //     //     scoresFromRef: newArr,
  //     //   }
  //     // );
  //   }, 1400),
  //   []
  // );
  // console.log(ownerRefList);
  const buyBoost = useCallback(
    debounce((newBoostVal, newBoostLists, newScore, newShowBoosts) => {
      console.log(newScore);
      axios.put(
        `https://65eafaa243ce16418932f611.mockapi.io/popit/popit/${hashedId}`,
        {
          clickPerOne: newBoostVal,
          clickAmount: newScore,
          boosts: newBoostLists,
          showBoosts: newShowBoosts,
        }
      );
    }, 200),
    []
  );
  const handleShowMarket = () => {
    document.querySelector("body").classList.remove("green");
    setShownMarket(true);
    setShowMenu(false);
  };
  const handlePercent = (value) => {
    // console.log(value);
    setPercent(value);
  };
  const energyDebounce = useCallback(
    debounce(() => {
      // console.log("Вызов SetEnergyWaiting");
      setEnergyWait(false);
    }, 800),
    []
  );
  const handleBubbleClick = (rowIndex, colIndex, setBubbleStates) => {
    if (percent > 0) {
      let newPercent = percent;
      newPercent -= 3;
      handlePercent(newPercent);

      const newBubbleStates = [...bubbleStates];
      newBubbleStates[rowIndex][colIndex] =
        !newBubbleStates[rowIndex][colIndex];
      setBubbleStates(newBubbleStates);
      setEnergyWait(true);

      energyDebounce();

      setScore((prevScore) => {
        prevScore = Number(clickPerOne) + Number(prevScore);
        const refGiftCount = Math.round(clickPerOne * 0.15);
        setTotalRefScore((prev) => prev + refGiftCount);
        // giveGiftScore(refId, totalRefScore);
        increaseCount(prevScore);
        setShown(prevScore);
        return prevScore;
      });
    } else {
      console.log("Ваша энергия на исходе");
      setPercent(0);
    }
  };
  const closeRating = () => {
    setShownRating(false);
  };
  // console.log("clickPerOne ", clickPerOne);
  const handleBoosting = () => {
    const boostELem = boostsLists[currentOpenedBoost];
    const pricePercent = boostELem.price * 0.1;

    const newBoostPrice = Math.floor(pricePercent + boostELem.price);
    console.log(pricePercent);
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
    console.log("newBoostLists ", newBoostLists);
    boostELem.price = newBoostPrice;
    boostELem.level = newBoostLevel;
    // console.log(newBoostItemлщ);
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

  useEffect(() => {
    axios
      .get(
        `https://65eafaa243ce16418932f611.mockapi.io/popit/popit?id=${hashedId}`
      )
      .then(({ data }) => {
        setScore(data[0].clickAmount);
        setClickPerOne(data[0].clickPerOne);
        setBoostsLists(data[0].boosts);
        setShowBoosts(data[0].showBoosts);
        setTimeout(() => {
          setLoaded(true);
        }, 500);
      })
      .catch((err) => {
        localStorage.removeItem("isAuth");
        localStorage.removeItem("authId");
        localStorage.removeItem("isChangedName");
        window.location.reload();
      });
  }, []);

  useEffect(() => animateScore(currentScore, setShown), [isLoadedApp]);
  return (
    <>
      {isShowRating ? <RatingPage closeRating={closeRating} /> : ""}
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
          isShowMarket={isShowMarket}
          boostImg1={boostImg1}
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
