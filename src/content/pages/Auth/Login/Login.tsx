import React from "react";
import { Box } from "@mui/material";

import classes from "./Login.module.scss";
import LoginPage from "./components/loginPage/LoginPage";

const Login = () => {
  return (
    <Box className={classes.container}>
      <img src={"/icon-192x192.png"} alt="logo" className={classes.logo} />
      <LoginPage />
    </Box>
  );
};
export default Login;
