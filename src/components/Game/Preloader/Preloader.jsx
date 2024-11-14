import React from "react";
import popitImg from "../../../assets/img/popi.png";
import loadingGif from "../../../assets/img/loading.gif";
function Preloader({}) {
  return (
    <div className="preloader">
      <img className="preloader-icon" src={popitImg} />
      <h2>Загружаем ваши пузырики ...</h2>
      <img className="preloader-loading" src={loadingGif} />
    </div>
  );
}

export default Preloader;
