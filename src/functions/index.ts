// functions/game.js
import axios from "axios";
import debounce from "lodash/debounce";

export const fetchUserData = async (
  userID,
  setScore,
  setClickPerOne,
  setBoostsLists,
  setShowBoosts,
  setLoaded
) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/${userID}`
    );
    setScore(data.clickAmount);
    setClickPerOne(data.clickPerOne);
    setBoostsLists(data.boosts);
    setShowBoosts(data.showBoosts);

    setTimeout(() => {
      setLoaded(true);
    }, 500);
  } catch (err) {
    window.location.reload();
  }
};

export const buyBoost = debounce(
  async (userID, newBoostVal, newBoostLists, newScore, newShowBoosts) => {
    await axios.put(`${process.env.REACT_APP_API_URL}/${userID}`, {
      clickPerOne: newBoostVal,
      clickAmount: newScore,
      boosts: newBoostLists,
      showBoosts: newShowBoosts,
    });
  },
  200
);

export const increaseCount = debounce(async (userID, num) => {
  await axios.put(`${process.env.REACT_APP_API_URL}/${userID}`, {
    clickAmount: num,
  });
}, 1400);
