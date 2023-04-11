import React, { useEffect } from "react";
import logo from "src/assests/images/optima-logo.png";
import LoginPage from "src/pages/auth/login/components/loginPage/LoginPage";
import { StyledBox } from "./Login.style";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { useNavigate } from "react-router";
import LocalStorage from "src/services/localStorage";
import { TOKEN } from "src/constants/constants";

const Login = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await LocalStorage.GetItem(TOKEN);
      if (token) navigate(-1);
    };
    checkAuth();
  }, [user?.id]);
  return (
    <StyledBox>
      <img src={logo} alt="Optima Geeks" className={"logo"} />
      <LoginPage />
    </StyledBox>
  );
};
export default Login;
