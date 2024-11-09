import React from "react";
import SignupComponent from "../../components/Signup/Signup";
import Header from "../../components/Header/Header";

function Signup({ isLoaded }) {
  return (
    <>
      <SignupComponent isLoaded={isLoaded} />
    </>
  );
}

export default Signup;
