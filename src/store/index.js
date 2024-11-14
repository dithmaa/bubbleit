import create from "zustand";

// Определяем хранилище Zustand
const useGameStore = create((set) => ({
  // Основные переменные состояния
  userID: 1,
  currentScore: 0,
  clickPerOne: 1,
  boostsLists: [],
  showBoosts: 1,

  // Функции для изменения состояния
  setUserID: (userID) => set({ userID }),
  setScore: (currentScore) => set({ currentScore }),
  setClickPerOne: (clickPerOne) => set({ clickPerOne }),
  setBoostsLists: (boostsLists) => set({ boostsLists }),
  setShowBoosts: (showBoosts) => set({ showBoosts }),
}));

export default useGameStore;
