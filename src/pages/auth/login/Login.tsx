import React, { useEffect, useState } from "react";
import logo from "src/assests/images/optima-logo.png";
import LoginPage from "src/pages/auth/login/components/loginPage/LoginPage";
import { StyledBox } from "./Login.style";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { useNavigate } from "react-router";
import LocalStorage from "src/services/localStorage";
import { TOKEN } from "src/constants/constants";
import Loader from "src/components/Loader/Loader";

const Login = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const token = await LocalStorage.GetItem(TOKEN);
      if (token) navigate("/dashboard");
      setLoading(false);
    };
    checkAuth();
  }, [user?.id]);
  return (
    <StyledBox>
      {loading && <Loader />}
      <img src={logo} alt="Optima Geeks" className={"logo"} />
      <LoginPage setLoading={setLoading} />
    </StyledBox>
  );
};
export default Login;
