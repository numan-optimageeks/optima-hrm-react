import React from "react";
import logo from "src/assests/images/optima-logo.png";
import LoginPage from "src/pages/auth/login/components/loginPage/LoginPage";
import { StyledBox } from "./Login.style";

const Login = () => {
  return (
    <StyledBox>
      <img src={logo} alt="Optima Geeks" className={"logo"} />
      <LoginPage />
    </StyledBox>
  );
};
export default Login;
