import { tg } from "../constants";

export const softClick = () => {
  tg.HapticFeedback.impactOccurred("soft");
};
export const rigidClick = () => {
  tg.HapticFeedback.impactOccurred("rigid");
};
export const heavyClick = () => {
  tg.HapticFeedback.impactOccurred("heavy");
};
