import React, { useEffect } from "react";
import logo from "src/assests/images/optima-logo.png";
import LoginPage from "src/pages/auth/login/components/loginPage/LoginPage";
import { StyledBox } from "./Login.style";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { useNavigate } from "react-router";
import { LOGIN } from "src/constants/routeConstants";

const Login = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) navigate("/dashboard");
  }, [token]);
  return (
    <StyledBox>
      <img src={logo} alt="Optima Geeks" className={"logo"} />
      <LoginPage />
    </StyledBox>
  );
};
export default Login;
