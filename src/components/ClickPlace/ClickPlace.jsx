import React, { useState, useEffect } from "react";

function ClickPlace({ clickPerOne, isShowNUM, setShowNUM }) {
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  //   const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      setClickPosition({ x: e.pageX, y: e.pageY });
    };

    document.querySelector(".game-page").addEventListener("click", handleClick);
    return () => {
      document
        .querySelector(".game-page")
        .removeEventListener("click", handleClick);
    };
  }, []);
  useEffect(() => {
    console.log("nomto");
    setTimeout(() => {
      setShowNUM(false);
    }, 1000);
  }, [isShowNUM]);
  return (
    <>
      <span
        className={`click-number ${isShowNUM ? "active" : ""}`}
        style={{
          position: "absolute",
          left: clickPosition.x,
          top: clickPosition.y,
          //   transform: "translate(-50%, -50%)",
          zIndex: 10000000,
        }}
      >
        {clickPerOne}
      </span>
    </>
  );
}

export default ClickPlace;
