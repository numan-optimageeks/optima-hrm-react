import React, { useState } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
} from "@mui/material";
import { FormikHelpers, useFormik } from "formik";

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
import { loginUser } from "src/store/features/Auth";
import { useNavigate } from "react-router";
import { StyledBox, StyledLabel, StyledTagline } from "./LoginPage.style";
import { useAxios } from "src/hooks/useAxios";
import LocalStorage from "src/services/localStorage";
import { TOKEN, USER } from "src/constants/constants";
import { useToast } from "src/hooks/useToast";
import { transformError } from "src/helpers/transformError";

const LoginPage = ({ setLoading }) => {
  const theme = useTheme();
  const AxiosClient = useAxios();
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleFormSubmit = async (
    values: ILogin,
    formikHelpers: FormikHelpers<ILogin>
  ) => {
    setLoading(true);
    try {
      const payload = {
        email: values?.email,
        password: values?.password,
      };
      const res = await AxiosClient.post(`/auth/login`, payload);

      const data = res?.data?.data;
      const user = {
        email: data?.user?.email,
        full_name: data?.user?.full_name,
        id: data?.user?.id,
      };
      LocalStorage.SetItem(TOKEN, data?.token);
      LocalStorage.SetItem(USER, JSON.stringify(user));
      dispatch(loginUser({ user: user, token: data?.token }));
      navigate("/dashboard");
    } catch (err) {
      formikHelpers?.setSubmitting(false);
      toast.error(transformError(err)?.message);
    }
    setLoading(false);
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
    <StyledBox>
      <form onSubmit={handleSubmit} autoComplete="off">
        <StyledLabel variant="h3">Login</StyledLabel>
        <StyledTagline variant="h6">Sign In to your account</StyledTagline>
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
        <Box display={"flex"} justifyContent={"flex-end"}>
          <CustomButton
            variant="contained"
            type="submit"
            //  uncomment to add validations
            // disabled={!(isValid && dirty) || isSubmitting}
          >
            Login
          </CustomButton>
        </Box>
      </form>
    </StyledBox>
  );
};
export default LoginPage;
