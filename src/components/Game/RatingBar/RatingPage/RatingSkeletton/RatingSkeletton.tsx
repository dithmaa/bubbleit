import React from "react";
import ContentLoader from "react-content-loader";

const RatingSkeletton = (props) => (
  <ContentLoader
    speed={1}
    width={285}
    height={58}
    viewBox="0 0 285 58"
    backgroundColor="#b8b8b8"
    foregroundColor="#ffffff"
    {...props}
  >
    <rect x="6" y="1" rx="6" ry="6" width="268" height="55" />
  </ContentLoader>
);

export default RatingSkeletton;
