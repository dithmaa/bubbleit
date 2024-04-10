import debounce from "lodash.debounce";
import { useCallback } from "react";

export function toShort(number) {
  const powers = ["", "", "M", "B", "T", "KV"];

  let shortened = "";
  let divider = 1;

  number = parseInt(number, 10).toString(); // Convert number to string to remove leading zeros
  for (let i = powers.length - 1; i >= 0; i--) {
    divider = Math.pow(1000, i);
    if (parseInt(number) >= divider) {
      let number_with_digits = (parseInt(number) / divider).toFixed(3); // Round the number to 3 decimal places
      number_with_digits = number_with_digits.replace(/(\.\d*?[1-9])0+$/, "$1"); // Keep trailing zeros for non-zero digit after decimal
      shortened = number_with_digits + "" + powers[i];
      break;
    }
  }

  return shortened;
}
export const animateScore = (sco, setShown) => {
  let smallNum;
  // let shortNum = "";

  if (sco < 1000) {
    // console.log("small");
    smallNum = sco * 0.9;
  } else if (sco >= 1000 && sco < 10000) {
    // console.log("more");
    smallNum = sco * 0.99;
  } else if (sco >= 10000 && sco < 100000) {
    smallNum = sco * 0.999;
  } else if (sco >= 100000 && sco < 1000000) {
    smallNum = sco * 0.9999;
  } else {
  }

  const interval = setInterval(() => {
    if (smallNum < sco) {
      ++smallNum;
      setShown(smallNum.toFixed(0)); // из-за округления показывает на 1 больше чем в бд
      // console.log(smallNum);

      // setNumber((prevNumber) => prevNumber + 1);
    } else {
      clearInterval(interval);
      setShown(sco);
    }
  }, 10);

  return () => clearInterval(interval);
};
