import React, { useEffect } from "react";
import SignupComponent from "../../components/Signup/Signup";
import Header from "../../components/Header/Header";

function Signup({ isLoaded }) {
  useEffect(() => {
    // alert("Signup page");
  }, []);
  return (
    <>
      <SignupComponent isLoaded={isLoaded} />
    </>
  );
}

export default Signup;
