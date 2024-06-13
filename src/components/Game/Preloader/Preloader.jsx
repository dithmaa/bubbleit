import React from "react";

function Preloader({ popitImg, preloaderImg }) {
  return (
    <div className="preloader">
      <img className="preloader-icon" src={popitImg} />
      <h2>Загружаем ваши ss ...</h2>
      <img className="preloader-loading" src={preloaderImg} />
    </div>
  );
}

export default Preloader;
