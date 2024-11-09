import React, { useCallback, useEffect, useState } from "react";
import boostImg1 from "../../assets/img/icon-boost-1.png";
import popitImg from "../../assets/img/popi.png";
import marketIcon from "../../assets/img/market_icon.png";
import friendIcon from "../../assets/img/friend_icon.png";
import copyIcon from "../../assets/img/copy.png";
import presentIcon from "../../assets/img/present.png";

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
import Challenges from "./Challenges/Challenges";

const tg = window.Telegram.WebApp;

function Game({ authId, currentID = 1 }) {
  const [showBoosts, setShowBoosts] = useState(1);
  const [friendsList, setFriendsList] = useState(1);
  const [currentScore, setScore] = useState(0);
  const [clickPerOne, setClickPerOne] = useState(1);
  const [boostsLists, setBoostsLists] = useState([]);
  const [shownScore, setShown] = useState(0);
  const [isNowBoosting, setIsNowBoosting] = useState(0);
  const [currentOpenedBoost, setCurrentOpenedBoost] = useState(0);
  const [isShowMenu, setShowMenu] = useState(1);
  const [isShowMarket, setShownMarket] = useState(false);
  const [isShowRating, setShownRating] = useState(false);
  const [isShowFriends, setShowFriends] = useState(false);
  const [isShowPresent, setShowPresent] = useState(false);
  const [inviterId, setInviterId] = useState(0);
  const [hasInviter, setHasInviter] = useState(false);

  const [inviterFriendsList, setInviterFriendsList] = useState(0);
  const [totalRefScore, setTotalRefScore] = useState(0);

  // console.log("Naranaa", currentID);
  // const [usID, setUsID] = useState(0);

  // console.log("totalRefScore", totalRefScore);
  // console.log("HAHA", friendsList);

  const [bubbleStates, setBubbleStates] = useState(
    Array.from({ length: 6 }, () => Array(6).fill(false))
  );
  //unuserID
  const userID = currentID;

  const [percent, setPercent] = useState(100);
  const [energyWait, setEnergyWait] = useState(true);

  const [isLoadedApp, setLoaded] = useState(false);

  const increaseCount = useCallback(
    //click increase on backend
    debounce((num) => {
      axios.put(
        `https://65eafaa243ce16418932f611.mockapi.io/popit/popit/${userID}`,
        {
          clickAmount: num,
        }
      );
    }, 1400),
    []
  );
  // const increase

  const harvestRef = (id, score) => {
    // console.log(id);
    const newV = currentScore + score;
    // console.log(newV);
    setScore(newV);
    setShown(newV);
    const itemToUpdate = friendsList.find((item) => item.id == id);
    if (itemToUpdate) {
      itemToUpdate.score = 0;
    }
    // console.log("NEWNEWNEW", friendsList);
    axios.put(
      `https://65eafaa243ce16418932f611.mockapi.io/popit/popit/${userID}`,
      {
        clickAmount: newV,
        scoresFromRef: friendsList,
      }
    );
    //clear from friends list
  };

  const handleShowPresent = () => {
    setShowPresent(!isShowPresent);
    // console.log("handleShowPresent");
  };
  const closePresent = () => {
    setShowPresent(!isShowPresent);
  };

  const buyBoost = useCallback(
    debounce((newBoostVal, newBoostLists, newScore, newShowBoosts) => {
      // console.log(newScore);
      axios.put(
        `https://65eafaa243ce16418932f611.mockapi.io/popit/popit/${userID}`,
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
  const handleShowFriends = () => {
    document.querySelector("body").classList.remove("green");
    setShowFriends(true);
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
  // console.log(inviterFriendsList);
  // console.log("inviterId", inviterId);

  const getFriends = async () => {
    // console.log("INVITER-ID / Хозяин / Тот кто пригласил", inviterId);
    await axios
      .get(
        `https://65eafaa243ce16418932f611.mockapi.io/popit/popit?id=${inviterId}`
      )
      .then(({ data }) => {
        setInviterFriendsList(data[0].scoresFromRef);
      });
  };
  useEffect(() => {
    if (hasInviter) {
      getFriends();
    }
  }, [hasInviter]);

  const updateFriendsListDebounced = useCallback(
    debounce((inviterFriendsList, newRefScore = 39, inviterId) => {
      const updateFriendsList = async () => {
        const itemToUpdate = inviterFriendsList.find(
          (item) => item.id === Number(userID)
        );

        if (itemToUpdate) {
          itemToUpdate.score = itemToUpdate.score + newRefScore;
          setTimeout(() => {
            setTotalRefScore(0); //сброс нажатых реф очков для нового подсчета
          }, 0);
        }

        // console.log(inviterFriendsList);
        // console.log("dd", inviterId);
        await axios.put(
          `https://65eafaa243ce16418932f611.mockapi.io/popit/popit/${inviterId}`,
          {
            scoresFromRef: inviterFriendsList,
          }
        );
      };

      updateFriendsList();
    }, 300),
    []
  );

  const handleBubbleClick = (rowIndex, colIndex, setBubbleStates) => {
    if (hasInviter) {
      setTimeout(() => {
        updateFriendsListDebounced(
          inviterFriendsList,
          totalRefScore,
          inviterId
        );
      }, 0);
    }
    if (percent > 0) {
      // if ("vibrate" in navigator) {
      //   navigator.vibrate(200); // Продолжительность вибрации в миллисекундах
      // } else {
      //   alert("API для вибрации не поддерживается в вашем браузере.");
      // }

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
        const refGiftCount = Math.ceil(clickPerOne * 0.15);
        setTotalRefScore((prev) => prev + refGiftCount);
        // giveGiftScore(refId, totalRefScore);
        increaseCount(prevScore);
        setShown(prevScore);
        // console.log("refGiftCount", refGiftCount);
        return prevScore;
      });
    } else {
      // console.log("Ваша энергия на исходе");
      setPercent(0);
    }
  };
  const closeRating = () => {
    setShownRating(false);
  };
  const closeFriends = () => {
    if (Number(currentScore) >= 1000000) {
      document.querySelector("body").classList.add("green");
    }

    setShowFriends(false);
    setShowMenu(true);
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
      .get(`https://65eafaa243ce16418932f611.mockapi.io/popit/popit/${userID}`)
      .then(({ data }) => {
        setScore(data.clickAmount);
        setClickPerOne(data.clickPerOne);
        setBoostsLists(data.boosts);
        setShowBoosts(data.showBoosts);
        setFriendsList(data.scoresFromRef);
        if (data.refId != 0 && data.refId) {
          setHasInviter(true);
          setInviterId(data.refId);
        }
        setTimeout(() => {
          setLoaded(true);
        }, 500);
      })
      .catch((err) => {
        // console.log("Ошибочка");
        // window.location.reload();
      });
  }, []);
  // console.log("isLoadedApp", isLoadedApp);

  useEffect(() => animateScore(currentScore, setShown), [isLoadedApp]);
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
          friendIcon={friendIcon}
          handleShowFriends={handleShowFriends}
          friendsList={friendsList}
          isShowFriends={isShowFriends}
          setShowFriends={setShowFriends}
          closeFriends={closeFriends}
          harvestRef={harvestRef}
          presentIcon={presentIcon}
          copyIcon={copyIcon}
        />
      ) : (
        <Preloader popitImg={popitImg} preloaderImg={preloaderImg} />
      )}
    </>
  );
}

export default Game;
