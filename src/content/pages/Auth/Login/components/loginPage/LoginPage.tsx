import React, { useState } from "react";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { FormikHelpers, useFormik } from "formik";

import classes from "./LoginPage.module.scss";
import {
  ILogin,
  LoginInitialValues,
  loginValidations,
} from "../../data/initialValues";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";
import { isError, isErrorMessage } from "src/utils/utils";
import CustomButton from "src/components/CustomButton/CustomButton";
import CustomInput from "src/components/CustomInput/CustomInput";
import { useDispatch } from "react-redux";
import { updateToken } from "src/store/features/Auth";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleFormSubmit = async (
    values: ILogin,
    formikHelpers: FormikHelpers<ILogin>
  ) => {
    try {
      dispatch(updateToken({ token: "123" }));
      navigate("/dashboard");
      console.log("values", values);
    } catch (err) {
      console.log("Error while Login");
    }
  };
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const {
    errors,
    touched,
    getFieldProps,
    handleSubmit,
    isValid,
    dirty,
    isSubmitting,
  } = useFormik({
    initialValues: LoginInitialValues(),
    validationSchema: loginValidations,
    onSubmit: handleFormSubmit,
  });

  const passwordEye = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          sx={{ marginRight: "1px" }}
          edge="end"
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    );
  };
  const startIcon = (type: string) => {
    return (
      <InputAdornment position="start">
        {type === "email" ? <AccountCircle /> : <LockIcon />}
      </InputAdornment>
    );
  };
  return (
    <Box
      className={classes.container}
      component="form"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <Typography variant="h3" className={classes.loginLabel}>
        Login
      </Typography>
      <Typography variant="h6" className={classes.loginTagline}>
        Sign In to your account
      </Typography>
      <CustomInput
        label="E-mail"
        type={"text"}
        id="email"
        placeholder="E-mail"
        helperText={
          isError("email", errors, touched)
            ? isErrorMessage("email", errors)
            : ""
        }
        error={isError("email", errors, touched)}
        {...getFieldProps("email")}
        InputProps={{
          startAdornment: startIcon("email"),
        }}
      />
      <CustomInput
        type={showPassword ? "text" : "password"}
        id="password"
        label="Password"
        placeholder="Password"
        helperText={
          isError("password", errors, touched)
            ? isErrorMessage("password", errors)
            : ""
        }
        error={isError("password", errors, touched)}
        InputProps={{
          endAdornment: passwordEye(),
          startAdornment: startIcon("password"),
        }}
        {...getFieldProps("password")}
        sx={{ margin: "20px 0px" }}
      />
      <Box className={classes.buttonWrapper}>
        <CustomButton
          variant="contained"
          type="submit"
          disabled={!(isValid && dirty) || isSubmitting}
        >
          Login
        </CustomButton>
      </Box>
    </Box>
  );
};
export default LoginPage;
