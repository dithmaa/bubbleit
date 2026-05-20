import React from "react";
import ContentLoader from "react-content-loader";

function BoostSkeletton(props) {
  return (
    <ContentLoader
      speed={1}
      width={450}
      height={80}
      viewBox="0 0 450 80"
      backgroundColor="#b8b8b8"
      foregroundColor="#ffffff"
      {...props}
    >
      <rect x="0" y="0" rx="6" ry="6" width="445" height="77" />
    </ContentLoader>
  );
}

export default BoostSkeletton;
