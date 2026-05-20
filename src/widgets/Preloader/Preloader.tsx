import popitImg from "../../../assets/img/popi.png";
import loadingGif from "../../../assets/img/loading.gif";

export const Preloader = () => {
  return (
    <div className="preloader">
      <img className="preloader-icon" alt="preloader" src={popitImg} />
      <h2>Загружаем ваши пузырики ...</h2>
      <img className="preloader-loading" alt="preloader" src={loadingGif} />
    </div>
  );
};
