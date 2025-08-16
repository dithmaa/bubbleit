import React from "react";
import SignupComponent from "../../components/Signup/Signup";

function Signup({ isLoaded }) {
  return (
    <>
      <SignupComponent isLoaded={isLoaded} />
    </>
  );
}

export default Signup;
