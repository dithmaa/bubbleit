import React from "react";

function Popit({
  popitImg,
  currentScore,
  bubbleStates,
  handleBubbleClick,
  setBubbleStates,
}) {
  return (
    <div
      className="popit"
      style={{
        backgroundImage: `url(${popitImg})`,
        filter: currentScore >= 1000000 ? "invert(1)" : "",
      }}
    >
      <div className="grid">
        {bubbleStates.map((row, rowIndex) => (
          <div key={rowIndex} className="popit-row">
            {row.map((active, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${active ? "active" : ""}`}
                onClick={(event) =>
                  handleBubbleClick(rowIndex, colIndex, setBubbleStates, event)
                }
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popit;
